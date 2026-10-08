import 'dotenv/config';
import express, { Router } from 'express';
import videoRoutes from './routes/video.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const apiRouter = Router();
apiRouter.use('/videos', videoRoutes);

app.use('/api', apiRouter);


app.listen(PORT, () => {
  console.log(`🚀 Palvelin pyörii portissa ${PORT}`);
});