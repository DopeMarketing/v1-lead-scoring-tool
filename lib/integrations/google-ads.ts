import { GoogleAdsApi, Customer } from 'google-ads-api';

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});

interface CampaignData {
  name: string;
  advertisingChannelType: string;
  status: string;
  budgetAmount: number;
}

interface CampaignReport {
  campaignId: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}

export async function createCampaign(customerId: string, data: CampaignData): Promise<any> {
  try {
    const customer = client.Customer({ customer_id: customerId });
    return await customer.campaigns.create({
      name: data.name,
      advertising_channel_type: data.advertisingChannelType,
      status: data.status,
      campaign_budget: { amount_micros: data.budgetAmount * 1000000 }
    });
  } catch (error) {
    throw new Error(`Failed to create campaign: ${error}`);
  }
}

export async function getCampaignReport(customerId: string, campaignId: string): Promise<CampaignReport> {
  try {
    const customer = client.Customer({ customer_id: customerId });
    const report = await customer.report({
      entity: 'campaign',
      attributes: ['campaign.id', 'metrics.impressions', 'metrics.clicks', 'metrics.cost_micros', 'metrics.conversions'],
      constraints: [{ key: 'campaign.id', op: '=', val: campaignId }]
    });
    return report[0] as CampaignReport;
  } catch (error) {
    throw new Error(`Failed to get campaign report: ${error}`);
  }
}