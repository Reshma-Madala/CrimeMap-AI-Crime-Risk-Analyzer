import mongoose from 'mongoose';

const safetyScoreSchema = new mongoose.Schema({
  city: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  safetyScore: { type: Number, required: true },
  mostCommonWeapon: { type: String, required: true },
  mostCommonCrime: { type: String, required: true }
});

const SafetyScore = mongoose.model('SafetyScore', safetyScoreSchema, 'safety_scores');

export default SafetyScore;
