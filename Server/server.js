import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './route/userRoute.js';
import bodyParser from 'body-parser'; // required for Clerk webhook parsing

const PORT = 4000;
const app = express();

// Connect to database
connectDB();

// Enable CORS
app.use(cors());

// Webhook raw body parser for Clerk (must come BEFORE express.json)
app.use('/api/user/webhooks', bodyParser.raw({ type: 'application/json' }));

// JSON body parser for all other routes
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Routes
app.use('/api/user', userRouter);

// Start server
app.listen(PORT, () => console.log('Server running on port', PORT));
