import express from 'express';
import SafetyScore from '../models/SafetyScores.js';

const router = express.Router();

// Get all cities with safety scores and info (for map pins)
router.get('/', async (req, res) => {
  try {
    const data = await SafetyScore.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Optionally, get safety info for a specific city
router.get('/:city', async (req, res) => {
  try {
    const cityName = req.params.city;
    const data = await SafetyScore.findOne({ city: cityName });
    if (!data) return res.status(404).json({ message: 'City not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
