export interface Organization {
  id: string;
  name: string;
  settings: any;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  email: string;
  role: string;
  organization_id: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IntegrationConfig {
  id: string;
  organization_id: string;
  integration_type: string;
  config_data: any;
  is_active: boolean;
  last_sync_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ScoringRule {
  id: string;
  organization_id: string;
  rule_type: string;
  rule_name: string;
  conditions: any;
  score_value: number;
  weight: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface GeographicTerritory {
  id: string;
  organization_id: string;
  territory_name: string;
  territory_type: string;
  territory_values: any;
  score_weight: number;
  is_priority: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface RequestCategory {
  id: string;
  organization_id: string;
  category_name: string;
  description: string | null;
  keywords: any;
  score_value: number;
  qualification_level: string;
  created_at: Date;
  updated_at: Date;
}

export interface Lead {
  id: string;
  organization_id: string;
  source_type: string;
  external_id: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  location_data: any;
  request_message: string | null;
  raw_data: any;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface LeadScore {
  id: string;
  organization_id: string;
  lead_id: string;
  email_validation_score: number | null;
  phone_verification_score: number | null;
  location_score: number | null;
  request_category_score: number | null;
  total_score: number;
  quality_grade: string | null;
  scoring_details: any;
  last_calculated_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface EmailValidation {
  id: string;
  organization_id: string;
  lead_id: string;
  email_address: string;
  validation_status: string;
  validation_score: number | null;
  validation_details: any;
  provider: string | null;
  validated_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface PhoneVerification {
  id: string;
  organization_id: string;
  lead_id: string;
  phone_number: string;
  formatted_number: string | null;
  verification_status: string;
  verification_method: string | null;
  verification_score: number | null;
  carrier_info: any;
  verification_code: string | null;
  code_sent_at: Date | null;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface LeadCategorization {
  id: string;
  organization_id: string;
  lead_id: string;
  category_id: string;
  confidence_score: number;
  matched_keywords: any;
  created_at: Date;
  updated_at: Date;
}

export interface SyncLog {
  id: string;
  organization_id: string;
  integration_config_id: string;
  sync_type: string;
  status: string;
  records_processed: number;
  records_created: number;
  records_updated: number;
  errors: any;
  metadata: any;
  started_at: Date;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Report {
  id: string;
  organization_id: string;
  created_by: string;
  report_name: string;
  report_type: string;
  filters: any;
  metrics: any;
  schedule: any;
  is_public: boolean;
  last_generated_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  organizations: Organization;
  users: User;
  integration_configs: IntegrationConfig;
  scoring_rules: ScoringRule;
  geographic_territories: GeographicTerritory;
  request_categories: RequestCategory;
  leads: Lead;
  lead_scores: LeadScore;
  email_validations: EmailValidation;
  phone_verifications: PhoneVerification;
  lead_categorizations: LeadCategorization;
  sync_logs: SyncLog;
  reports: Report;
}