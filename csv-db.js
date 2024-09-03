import { connectToDB, saveStats, fetchAllDocuments } from './modules/database.js';
import { parseCSV, convertToCSV } from './modules/Parser.js';
import { readFileContent, writeFileContent } from './modules/files.js';
import mongoose from 'mongoose';

// Function to write CSV data to MongoDB
const writeToDb = async (filePath) => {
  const fileName = filePath.split('/').pop().split('.')[0];

  try {
    await connectToDB(); // Ensure connection is established
    const collection = mongoose.connection.db.collection(fileName);
    console.log(`Reading CSV file from path: ${filePath}`);

    const csvContent = await readFileContent(filePath); // Read the CSV content from the file
    console.log('Parsing CSV content');
    const data = await parseCSV(csvContent); // Parse the CSV content into data

    await collection.insertMany(data);
    await saveStats('write', filePath, data.length);

    console.log(`Successfully wrote ${data.length} records to the ${fileName} collection.`);
  } catch (err) {
    console.error('Error writing to database:', err.message);
  }
};

// Function to read data from MongoDB and write to CSV
const readFromDb = async (collectionName, outputFilePath) => {
  try {
    await connectToDB(); // Ensure connection is established
    const data = await fetchAllDocuments(collectionName);
    console.log(`Converting data to CSV`);

    const csvData = await convertToCSV(data); // Convert data to CSV string
    console.log(`Writing CSV data to path: ${outputFilePath}`);
    await writeFileContent(outputFilePath, csvData); // Write the CSV string to file

    await saveStats('read', outputFilePath, data.length);
    console.log(`Successfully wrote ${data.length} records from the ${collectionName} collection to ${outputFilePath}.`);
  } catch (err) {
    console.error('Error reading from database:', err.message);
  }
};

// Main function to process command-line arguments
const main = async () => {
  const [command, ...args] = process.argv.slice(2);

  if (command === 'write') {
    const [filePath] = args;
    await writeToDb(filePath);
  } else if (command === 'read') {
    const [collectionName, outputFilePath] = args;
    await readFromDb(collectionName, outputFilePath);
  } else {
    console.log('Unknown command.');
  }

  mongoose.connection.close();
};

main();
