// import mongoose from 'mongoose';

// // Define the schema for the Crime model
// const crimeSchema = new mongoose.Schema({
//   'Report Number': { type: Number },
//   'Date Reported': { type: Date },
//   'Date of Occurrence': { type: Date },
//   'Time of Occurrence': { type: Number },
//   'Crime Code': { type: String },
//   'Crime Description': { type: String },
//   'Victim Age': { type: Number },
//   'Weapon Used': { type: String },
//   'Police Deployed': { type: Number },
//   'Case Closed': { type: String },
//   'Date Case Closed': { type: String },
//   'City_Ahmedabad': { type: Boolean },
//   'City_Bangalore': { type: Boolean },
//   'City_Bhopal': { type: Boolean },
//   'City_Chennai': { type: Boolean },
//   'City_Delhi': { type: Boolean },
//   'City_Faridabad': { type: Boolean },
//   'City_Ghaziabad': { type: Boolean },
//   'City_Hyderabad': { type: Boolean },
//   'City_Indore': { type: Boolean },
//   'City_Jaipur': { type: Boolean },
//   'City_Kalyan': { type: Boolean },
//   'City_Kanpur': { type: Boolean },
//   'City_Kolkata': { type: Boolean },
//   'City_Lucknow': { type: Boolean },
//   'City_Ludhiana': { type: Boolean },
//   'City_Meerut': { type: Boolean },
//   'City_Mumbai': { type: Boolean },
//   'City_Nagpur': { type: Boolean },
//   'City_Nashik': { type: Boolean },
//   'City_Patna': { type: Boolean },
//   'City_Pune': { type: Boolean },
//   'City_Rajkot': { type: Boolean },
//   'City_Srinagar': { type: Boolean },
//   'City_Surat': { type: Boolean },
//   'City_Thane': { type: Boolean },
//   'City_Varanasi': { type: Boolean },
//   'City_Vasai': { type: Boolean },
//   'City_Visakhapatnam': { type: Boolean },
//   'Crime Domain_Other Crime': { type: Boolean },
//   'Crime Domain_Traffic Fatality': { type: Boolean },
//   'Crime Domain_Violent Crime': { type: Boolean },
//   'Victim Gender_M': { type: Boolean },
//   'Victim Gender_X': { type: Boolean },
// }, { strict: false });

// import mongoose from 'mongoose';

// // Schema-less: this lets you flexibly load any structure (CSV-based)
// const crimeSchema = new mongoose.Schema({}, { strict: false });

// // Ensure that 'crimestable' is the correct collection name in MongoDB
// export default mongoose.model('Crime', crimeSchema, 'crimestable');

import mongoose from 'mongoose';

const CrimeSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model('Crime', CrimeSchema, 'crimestable'); 
