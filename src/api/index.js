import express from 'express';
import morgan from 'morgan';
import { errors } from 'celebrate';
import helmet from 'helmet';
import userRoute from './routes/userRoute.js';
import 'dotenv/config';

const api = express();

const PORT = process.env.PORT || 3001;

api.use(morgan('dev'));

api.use(helmet());

api.use(express.urlencoded({ extended: true }));

api.use(express.json());

api.use(errors());

api.use('/challenge', userRoute);

api.get('/', (_, res) => {
  res.send('Welcome to Banpay');
});

api.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default api;
