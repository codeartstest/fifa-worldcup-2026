import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { config } from './utils/config';
import { rateLimiter } from './middleware/rateLimit';
import { errorHandler } from './middleware/errorHandler';
import apiRouter from './routes/api';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigins.split(','), credentials: true }));
app.use(compression());
app.use(express.json());

app.use(rateLimiter);

app.use('/api/v1', apiRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[Server] FIFA World Cup 2026 API running on port ${config.port}`);
});

export default app;