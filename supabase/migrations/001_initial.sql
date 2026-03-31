BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  settings jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text NOT NULL,
  role text NOT NULL,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Integration configs table
CREATE TABLE integration_configs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  integration_type text NOT NULL,
  config_data jsonb NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  last_sync_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Scoring rules table
CREATE TABLE scoring_rules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  rule_type text NOT NULL,
  rule_name text NOT NULL,
  conditions jsonb NOT NULL,
  score_value integer NOT NULL,
  weight decimal NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Geographic territories table
CREATE TABLE geographic_territories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  territory_name text NOT NULL,
  territory_type text NOT NULL,
  territory_values jsonb NOT NULL,
  score_weight decimal NOT NULL,
  is_priority boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Request categories table
CREATE TABLE request_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  category_name text NOT NULL,
  description text,
  keywords jsonb NOT NULL,
  score_value integer NOT NULL,
  qualification_level text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Leads table
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  source_type text NOT NULL,
  external_id text,
  first_name text,
  last_name text,
  email text,
  phone text,
  company text,
  location_data jsonb,
  request_message text,
  raw_data jsonb,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Lead scores table
CREATE TABLE lead_scores (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  email_validation_score integer,
  phone_verification_score integer,
  location_score integer,
  request_category_score integer,
  total_score integer NOT NULL DEFAULT 0,
  quality_grade text,
  scoring_details jsonb,
  last_calculated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE UNIQUE INDEX users_email_idx ON users(email);
CREATE INDEX users_organization_id_idx ON users(organization_id);
CREATE INDEX users_created_at_idx ON users(created_at);

CREATE INDEX organizations_name_idx ON organizations(name);
CREATE INDEX organizations_created_at_idx ON organizations(created_at);

CREATE INDEX integration_configs_organization_id_idx ON integration_configs(organization_id);
CREATE INDEX integration_configs_integration_type_idx ON integration_configs(integration_type);
CREATE INDEX integration_configs_created_at_idx ON integration_configs(created_at);

CREATE INDEX scoring_rules_organization_id_idx ON scoring_rules(organization_id);
CREATE INDEX scoring_rules_rule_type_idx ON scoring_rules(rule_type);
CREATE INDEX scoring_rules_created_at_idx ON scoring_rules(created_at);

CREATE INDEX geographic_territories_organization_id_idx ON geographic_territories(organization_id);
CREATE INDEX geographic_territories_territory_type_idx ON geographic_territories(territory_type);
CREATE INDEX geographic_territories_created_at_idx ON geographic_territories(created_at);

CREATE INDEX request_categories_organization_id_idx ON request_categories(organization_id);
CREATE INDEX request_categories_qualification_level_idx ON request_categories(qualification_level);
CREATE INDEX request_categories_created_at_idx ON request_categories(created_at);

CREATE INDEX leads_organization_id_idx ON leads(organization_id);
CREATE INDEX leads_email_idx ON leads(email);
CREATE INDEX leads_phone_idx ON leads(phone);
CREATE INDEX leads_status_idx ON leads(status);
CREATE INDEX leads_source_type_idx ON leads(source_type);
CREATE INDEX leads_created_at_idx ON leads(created_at);

CREATE INDEX lead_scores_organization_id_idx ON lead_scores(organization_id);
CREATE UNIQUE INDEX lead_scores_lead_id_idx ON lead_scores(lead_id);
CREATE INDEX lead_scores_total_score_idx ON lead_scores(total_score);
CREATE INDEX lead_scores_quality_grade_idx ON lead_scores(quality_grade);
CREATE INDEX lead_scores_created_at_idx ON lead_scores(created_at);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scoring_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE geographic_territories ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "owner_all" ON organizations FOR ALL USING (
  id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
) WITH CHECK (
  id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON users FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
) WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON integration_configs FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
) WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON scoring_rules FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
) WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON geographic_territories FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
) WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON request_categories FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
) WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON leads FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
) WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON lead_scores FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
) WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;