import { OAuth2Client } from 'google-auth-library';

export const google_client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/auth/callback/google' // Redirect URI
);