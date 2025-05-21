const Crime = require("../models/Crime");

const getAllCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find().limit(100); // Add filters later
    res.status(200).json(crimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCrimes };
