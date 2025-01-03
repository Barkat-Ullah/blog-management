import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Book management api is running successfully!' });
});

app.use(notFound);
app.use(globalErrorHandler);
export default app;
