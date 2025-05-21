import express from 'express';
import Crime from '../models/Crime.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { city, crime, weapon } = req.query;

    const isValid = (val) => val && val.trim() !== '' && val.trim().toLowerCase() !== 'skip';

    const filter = {};

    if (isValid(city)) {
      filter['City'] = new RegExp(`^${city.trim()}$`, 'i'); // case-insensitive exact match
    }
    if (isValid(crime)) {
      filter['Crime Description'] = new RegExp(`^${crime.trim()}$`, 'i');
    }
    if (isValid(weapon)) {
      filter['Weapon Used'] = new RegExp(`^${weapon.trim()}$`, 'i');
    }

    console.log('MongoDB query filter:', filter);

    const crimes = await Crime.find(filter);

    res.status(200).json(crimes);
  } catch (err) {
    console.error('Error fetching filtered crimes:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/filters', async (req, res) => {
  try {
    const cities = await Crime.distinct('City');
    const crimes = await Crime.distinct('Crime Description');
    const weapons = await Crime.distinct('Weapon Used');

    res.status(200).json({ cities, crimes, weapons });
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ message: 'Error fetching filters', error: err.message });
  }
});

export default router;
