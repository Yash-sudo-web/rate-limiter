import express, { Application } from 'express';
import connectDB from './config/db';
import bookRoutes from './routes/bookRoutes';
import { rateLimiter } from './middlewares/rateLimiter';
import { connectRedis } from './config/redis';

const app: Application = express();
const PORT = 3000;

connectDB();
connectRedis();
app.use(express.json());

app.use(rateLimiter);

app.use('/api', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
