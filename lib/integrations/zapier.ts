import axios from 'axios';

const zapierClient = axios.create({
  baseURL: 'https://hooks.zapier.com/hooks/catch',
  headers: {
    'Content-Type': 'application/json'
  }
});

interface WebhookData {
  [key: string]: any;
}

interface ZapTrigger {
  hookId: string;
  data: WebhookData;
}

export async function triggerZap(hookId: string, data: WebhookData): Promise<any> {
  try {
    const response = await zapierClient.post(`/${hookId}/`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to trigger Zap: ${error}`);
  }
}

export async function createWebhook(zapId: string, targetUrl: string): Promise<any> {
  try {
    const response = await axios.post(
      'https://zapier.com/api/v1/hooks/',
      {
        target_url: targetUrl,
        event: 'lead_created'
      },
      {
        headers: {
          'X-API-Key': process.env.ZAPIER_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create webhook: ${error}`);
  }
}