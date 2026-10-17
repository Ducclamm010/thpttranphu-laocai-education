// src/lib/google-drive.ts
import { google } from 'googleapis';
import { env } from '@/env';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_DRIVE_MAIL,
    private_key: env.GOOGLE_DRIVE_PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

export const driveClient = google.drive({
  version: 'v3',
  auth,
});

export const DRIVE_FOLDER_ID = env.GOOGLE_DRIVE_FOLDER_ID;