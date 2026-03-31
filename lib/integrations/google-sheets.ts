import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_SHEETS_API_KEY
});

interface SheetData {
  values: any[][];
}

interface SheetRange {
  spreadsheetId: string;
  range: string;
  values?: any[][];
}

export async function appendToSheet(spreadsheetId: string, range: string, values: any[][]): Promise<any> {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to append to sheet: ${error}`);
  }
}

export async function getSheetData(spreadsheetId: string, range: string): Promise<any[][]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });
    return response.data.values || [];
  } catch (error) {
    throw new Error(`Failed to get sheet data: ${error}`);
  }
}