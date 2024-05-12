import express, { json, urlencoded, Response as ExResponse } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../build/routes';
import { errorHandler } from './middlewares/errorHandler';
import { getRateLimiter } from './middlewares/rateLimiter';

dotenv.config();

export const app = express();

app.use(getRateLimiter());

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true
  })
);
app.use(json());
app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  })
);

RegisterRoutes(app);

// Handle missing routes
app.use((_req, res: ExResponse) => {
  res.status(404).send({
    message: 'Not Found'
  });
});

app.use(errorHandler);
