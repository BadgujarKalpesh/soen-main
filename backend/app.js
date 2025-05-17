import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
connect();

const allowedOrigins = [
  'https://soen-main-subp.vercel.app',
  'https://soen-main-subp-kalpesh-badgujars-projects.vercel.app',
  'https://soen-main-subp-git-main-kalpesh-badgujars-projects.vercel.app',
  'https://soen-main-subp-jdmjfoiel-kalpesh-badgujars-projects.vercel.app'
];
const app = express();

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use("/ai", aiRoutes)



app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app; 
