import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Router } from 'express';
import videoRoutes from './routes/video.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // React-kehityspalvelimen osoite
  credentials: true // SALLII EVÄSTEIDEN KULUN (httpOnly cookies)
}));

const apiRouter = Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/videos', videoRoutes);

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.redirect('/api/auth/google');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running in port ${PORT}`);
});