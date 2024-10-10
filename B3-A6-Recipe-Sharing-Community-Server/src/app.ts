/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';
// import meiliClient from './app/utils/meilisearch';

const app: Application = express();

//Using json parser by express and cors parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true }));
// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000',
//       'https://sports-facility-platform.web.app',
//       'https://sports-facility-platform.firebaseapp.com',
//     ],
//     credentials: true,
//   })
// );
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api/v1', routes);

// meiliClient.index('items').deleteAllDocuments();

app.get('/', (req: Request, res: Response) => {
  res.send('Server Started!');
});

//not found route
app.all('*', notFound);

//Using global error handler
app.use(globalErrorHandler);

export default app;
