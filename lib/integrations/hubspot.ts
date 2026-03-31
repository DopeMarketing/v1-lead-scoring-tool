import { Client } from '@hubspot/api-client';

const hubspot = new Client({ accessToken: process.env.HUBSPOT_API_KEY });

interface ContactData {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  phone?: string;
}

interface Contact {
  id: string;
  properties: ContactData;
  createdAt: string;
  updatedAt: string;
}

export async function createContact(data: ContactData): Promise<Contact> {
  try {
    const response = await hubspot.crm.contacts.basicApi.create({
      properties: data
    });
    return response as Contact;
  } catch (error) {
    throw new Error(`Failed to create contact: ${error}`);
  }
}

export async function getContact(contactId: string): Promise<Contact> {
  try {
    const response = await hubspot.crm.contacts.basicApi.getById(
      contactId,
      ['email', 'firstname', 'lastname', 'company', 'phone']
    );
    return response as Contact;
  } catch (error) {
    throw new Error(`Failed to get contact: ${error}`);
  }
}