import { supabase } from '@/lib/supabase';
import type {
  Organization,
  User,
  IntegrationConfig,
  ScoringRule,
  RequestCategory,
  Lead,
  LeadScore,
  SyncLog
} from '@/types';

// Organizations
export async function getAllOrganizations(): Promise<Organization[]> {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch organizations: ${error.message}`);
  return data || [];
}

export async function getOrganizationById(id: string): Promise<Organization | null> {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch organization: ${error.message}`);
  return data;
}

export async function createOrganization(org: Omit<Organization, 'id' | 'created_at' | 'updated_at'>): Promise<Organization> {
  const { data, error } = await supabase
    .from('organizations')
    .insert(org)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create organization: ${error.message}`);
  return data;
}

export async function updateOrganization(id: string, updates: Partial<Organization>): Promise<Organization> {
  const { data, error } = await supabase
    .from('organizations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update organization: ${error.message}`);
  return data;
}

export async function deleteOrganization(id: string): Promise<void> {
  const { error } = await supabase
    .from('organizations')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete organization: ${error.message}`);
}

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data || [];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// Integration Configs
export async function getAllIntegrationConfigs(): Promise<IntegrationConfig[]> {
  const { data, error } = await supabase
    .from('integration_configs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch integration configs: ${error.message}`);
  return data || [];
}

export async function getIntegrationConfigById(id: string): Promise<IntegrationConfig | null> {
  const { data, error } = await supabase
    .from('integration_configs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch integration config: ${error.message}`);
  return data;
}

export async function createIntegrationConfig(config: Omit<IntegrationConfig, 'id' | 'created_at' | 'updated_at'>): Promise<IntegrationConfig> {
  const { data, error } = await supabase
    .from('integration_configs')
    .insert(config)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create integration config: ${error.message}`);
  return data;
}

export async function updateIntegrationConfig(id: string, updates: Partial<IntegrationConfig>): Promise<IntegrationConfig> {
  const { data, error } = await supabase
    .from('integration_configs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update integration config: ${error.message}`);
  return data;
}

export async function deleteIntegrationConfig(id: string): Promise<void> {
  const { error } = await supabase
    .from('integration_configs')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete integration config: ${error.message}`);
}

// Scoring Rules
export async function getAllScoringRules(): Promise<ScoringRule[]> {
  const { data, error } = await supabase
    .from('scoring_rules')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch scoring rules: ${error.message}`);
  return data || [];
}

export async function getScoringRuleById(id: string): Promise<ScoringRule | null> {
  const { data, error } = await supabase
    .from('scoring_rules')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch scoring rule: ${error.message}`);
  return data;
}

export async function createScoringRule(rule: Omit<ScoringRule, 'id' | 'created_at' | 'updated_at'>): Promise<ScoringRule> {
  const { data, error } = await supabase
    .from('scoring_rules')
    .insert(rule)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create scoring rule: ${error.message}`);
  return data;
}

export async function updateScoringRule(id: string, updates: Partial<ScoringRule>): Promise<ScoringRule> {
  const { data, error } = await supabase
    .from('scoring_rules')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update scoring rule: ${error.message}`);
  return data;
}

export async function deleteScoringRule(id: string): Promise<void> {
  const { error } = await supabase
    .from('scoring_rules')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete scoring rule: ${error.message}`);
}

// Request Categories
export async function getAllRequestCategories(): Promise<RequestCategory[]> {
  const { data, error } = await supabase
    .from('request_categories')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch request categories: ${error.message}`);
  return data || [];
}

export async function getRequestCategoryById(id: string): Promise<RequestCategory | null> {
  const { data, error } = await supabase
    .from('request_categories')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch request category: ${error.message}`);
  return data;
}

export async function createRequestCategory(category: Omit<RequestCategory, 'id' | 'created_at' | 'updated_at'>): Promise<RequestCategory> {
  const { data, error } = await supabase
    .from('request_categories')
    .insert(category)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create request category: ${error.message}`);
  return data;
}

export async function updateRequestCategory(id: string, updates: Partial<RequestCategory>): Promise<RequestCategory> {
  const { data, error } = await supabase
    .from('request_categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update request category: ${error.message}`);
  return data;
}

export async function deleteRequestCategory(id: string): Promise<void> {
  const { error } = await supabase
    .from('request_categories')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete request category: ${error.message}`);
}

// Leads
export async function getAllLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch leads: ${error.message}`);
  return data || [];
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch lead: ${error.message}`);
  return data;
}

export async function createLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .insert(lead)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create lead: ${error.message}`);
  return data;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update lead: ${error.message}`);
  return data;
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete lead: ${error.message}`);
}

// Lead Scores
export async function getAllLeadScores(): Promise<LeadScore[]> {
  const { data, error } = await supabase
    .from('lead_scores')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch lead scores: ${error.message}`);
  return data || [];
}

export async function getLeadScoreById(id: string): Promise<LeadScore | null> {
  const { data, error } = await supabase
    .from('lead_scores')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch lead score: ${error.message}`);
  return data;
}

export async function createLeadScore(score: Omit<LeadScore, 'id' | 'created_at' | 'updated_at'>): Promise<LeadScore> {
  const { data, error } = await supabase
    .from('lead_scores')
    .insert(score)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create lead score: ${error.message}`);
  return data;
}

export async function updateLeadScore(id: string, updates: Partial<LeadScore>): Promise<LeadScore> {
  const { data, error } = await supabase
    .from('lead_scores')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update lead score: ${error.message}`);
  return data;
}

export async function deleteLeadScore(id: string): Promise<void> {
  const { error } = await supabase
    .from('lead_scores')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete lead score: ${error.message}`);
}

// Sync Logs
export async function getAllSyncLogs(): Promise<SyncLog[]> {
  const { data, error } = await supabase
    .from('sync_logs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch sync logs: ${error.message}`);
  return data || [];
}

export async function getSyncLogById(id: string): Promise<SyncLog | null> {
  const { data, error } = await supabase
    .from('sync_logs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch sync log: ${error.message}`);
  return data;
}

export async function createSyncLog(log: Omit<SyncLog, 'id' | 'created_at' | 'updated_at'>): Promise<SyncLog> {
  const { data, error } = await supabase
    .from('sync_logs')
    .insert(log)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create sync log: ${error.message}`);
  return data;
}

export async function updateSyncLog(id: string, updates: Partial<SyncLog>): Promise<SyncLog> {
  const { data, error } = await supabase
    .from('sync_logs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update sync log: ${error.message}`);
  return data;
}

export async function deleteSyncLog(id: string): Promise<void> {
  const { error } = await supabase
    .from('sync_logs')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete sync log: ${error.message}`);
}