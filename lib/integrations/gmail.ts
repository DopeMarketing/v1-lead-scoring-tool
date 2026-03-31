import { google } from 'googleapis';

const gmail = google.gmail({
  version: 'v1',
  auth: process.env.GMAIL_API_KEY
});

interface EmailData {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

interface Email {
  id: string;
  threadId: string;
  snippet: string;
  payload: any;
}

export async function sendEmail(data: EmailData): Promise<any> {
  try {
    const email = [
      `To: ${data.to}`,
      `Subject: ${data.subject}`,
      `From: ${data.from || 'noreply@example.com'}`,
      '',
      data.body
    ].join('\n');

    const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

    return await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail
      }
    });
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}

export async function getEmails(query: string = '', maxResults: number = 10): Promise<Email[]> {
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults
    });

    const messages = response.data.messages || [];
    const emails = await Promise.all(
      messages.map(async (msg) => {
        const email = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id!
        });
        return email.data as Email;
      })
    );

    return emails;
  } catch (error) {
    throw new Error(`Failed to get emails: ${error}`);
  }
}