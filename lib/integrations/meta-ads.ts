import { FacebookAdsApi, Campaign, AdAccount } from 'facebook-nodejs-business-sdk';

const api = FacebookAdsApi.init(process.env.META_ADS_API_KEY!);

interface CampaignData {
  name: string;
  objective: string;
  status: string;
  budget?: number;
}

interface CampaignMetrics {
  impressions: number;
  clicks: number;
  spend: number;
  cpm: number;
  ctr: number;
}

export async function createCampaign(accountId: string, data: CampaignData): Promise<Campaign> {
  try {
    const account = new AdAccount(`act_${accountId}`);
    return await account.createCampaign([], {
      name: data.name,
      objective: data.objective,
      status: data.status,
      daily_budget: data.budget
    });
  } catch (error) {
    throw new Error(`Failed to create campaign: ${error}`);
  }
}

export async function getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
  try {
    const campaign = new Campaign(campaignId);
    const insights = await campaign.getInsights(['impressions', 'clicks', 'spend', 'cpm', 'ctr']);
    return insights.data[0] as CampaignMetrics;
  } catch (error) {
    throw new Error(`Failed to get campaign metrics: ${error}`);
  }
}