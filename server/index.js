import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.disable('x-powered-by'); //less hacker knows about your stack
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
