import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import connect from './databse/conn.js';
import router from './router/route.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
//middleware
app.use(cors());
app.use(morgan('dev'));
app.disable('x-powered-by'); //less hacker knows about your stack
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 8080;
//http get requres
app.use('/api', router);

//start server only when we have valid connection;
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`server is listening to port http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log('cannot connect to the server');
    }
  })
  .catch((error) => {
    console.log('Invalid database connection..');
  });
