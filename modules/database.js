import mongoose from 'mongoose';

// Define Stats schema and model
const StatsSchema = new mongoose.Schema({
  operation: String,
  filePath: String,
  timestamp: { type: Date, default: Date.now },
  rowCount: Number
});

const Stats = mongoose.model('Stats', StatsSchema);

// Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://silujoshi2:FuJp1V4oH1R2CRwr@cluster0.4hgds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

// Define ScriptStats schema and model
const scriptStatsSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  operation: String,
  file: String,
  rowCount: Number,
});

const ScriptStats = mongoose.model('ScriptStats', scriptStatsSchema);

// Function to save script statistics
const saveStats = async (operation, file, rowCount) => {
  const stat = new ScriptStats({ operation, file, rowCount });
  await stat.save();
};

// Function to fetch all documents from a collection as an array
const fetchAllDocuments = async (collectionName) => {
  const collection = mongoose.connection.collection(collectionName);
  return await collection.find({}).toArray();  // Ensure you await the toArray() method
};

export { connectToDB, saveStats, fetchAllDocuments };
