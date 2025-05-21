const { MongoClient } = require("mongodb");

async function testMongoConnection() {
  const uri = "mongodb+srv://reshma_madala:admin123@crimewatch.ntwx0xx.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db("crimesdata");
    const collection = db.collection("crimestable");

    const results = await collection.find({}).toArray();
    console.log("Fetched data:", results);  // Output the results in the console

    client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

testMongoConnection();
