import express, { Application } from 'express';
import connectDB from './config/db';
import bookRoutes from './routes/bookRoutes';
import logsRoutes from './routes/logsRoutes';
import { rateLimiter } from './middlewares/rateLimiter';
import { connectRedis } from './config/redis';

const app: Application = express();
app.set('trust proxy', 1);
const PORT = 3000;

connectDB();
connectRedis();
app.use(express.json());

app.use(rateLimiter);

app.use('/api', bookRoutes);
app.use('/api/logs', logsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
