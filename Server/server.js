import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './route/userRoute.js';
import bodyParser from 'body-parser';
import { clerkMiddleware } from "@clerk/express";
import imageRouter from './route/imageRoute.js';

const PORT = 4000;
const app = express();

connectDB();
app.use(cors());

app.use('/api/user/webhooks', bodyParser.raw({ type: 'application/json' }));
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send('API is working'));

app.use('/api/user', userRouter);
app.use('/api/image',imageRouter)

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
