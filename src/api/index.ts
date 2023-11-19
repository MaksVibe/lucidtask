'use server';

import { google } from 'googleapis';

const SPREADSHIT_ID = '1tper6EjzVBWD8qzIejhEO4Sxj4kUzsOyHQFQxYzRkfM';
const RANGE = 'Аркуш1';
const INPUT_OPTION = 'RAW';

export const sendData = async (formData: FormData) => {
  const addname = formData.get('name') as string;
  const addnumber = formData.get('phone') as string;

  if (!addname?.trim() || !addnumber?.trim()) {
    return;
  }

  if (!/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ\s]+$/u.test(addname)) {
    console.log("Введіть im'я тільки буквами");
    return;
  }

  if (!/^[0-9]{9}$/.test(addnumber)) {
    console.log('Введіть номер телефону (9 цифр)');
    return;
  }

  const auth = await google.auth.getClient({
    projectId: process.env.PROJECT_ID,
    credentials: {
      type: 'service_account',
      // private_key: process.env.PRIVAT_KEY?.split(String.raw`\n`).join('/n'), // works for LOCAL
      private_key: process.env.PRIVAT_KEY, // works for PROD
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      token_url: 'https://oauth2.googleapis.com/token',
      universe_domain: 'googleapis.com',
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const data = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHIT_ID,
    range: RANGE,
    valueInputOption: INPUT_OPTION,
    requestBody: {
      values: [[addname, '+380' + addnumber]],
    },
  });

  console.log('data', data);
  console.log('status', data.status); // if (status === 200) doSomething (for example message, that "your data will be proceed")
};
