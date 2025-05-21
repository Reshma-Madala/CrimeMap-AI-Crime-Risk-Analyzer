import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import crimeRoutes from './routes/crimeRoutes.js';
import safetyRoutes from './routes/safetyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/crimes', crimeRoutes);
app.use('/api/safety', safetyRoutes);

app.use((req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found" });
});

mongoose.connect(process.env.MONGO_URI, { dbName: 'crimesdata' })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
