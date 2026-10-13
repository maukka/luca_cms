import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {google_client} from '../config/google_auth';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';

const authRoutes = Router();

authRoutes.get('/google', (req, res) => {
  const url = google_client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
    prompt: 'select_account'
  });
  res.redirect(url);
});

authRoutes.get('/callback/google', async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
	const { tokens } = await google_client.getToken(code);
	google_client.setCredentials(tokens);

	if (!tokens.id_token) {
      return res.status(400).json({ error: 'ID token missing from Google response' });
    }

	 const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
	  return res.status(400).json({ error: 'GOOGLE_CLIENT_ID environment variable is missing'});
    }

	 const ticket = await google_client.verifyIdToken({
    	idToken: tokens.id_token,
    	audience: clientId,  // Specify the CLIENT_ID of the app that accesses the backend
  	});

	const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email) {
      return res.status(400).json({ error: 'Invalid Google user payload' });
    }

	const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET missing from environment variables');
    }

	const sessionToken = jwt.sign(
      {
        userId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

	res.cookie('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 vuorokautta
    });
	return res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  } catch (error) {
	console.error('Google Token Exchange Error:', error);
	return res.status(500).json({ error: 'Error retrieving access token' });
  }
});

authRoutes.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('session_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return res.status(200).json({ message: 'Uloskirjautuminen onnistui' });
});

authRoutes.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({ user: req.user });
});

export default authRoutes;	