import csvParser from 'csv-parser';
import { createObjectCsvStringifier } from 'csv-writer';
// import { Readable } from 'json2csv/JSON2CSVTransform';
import { Readable } from 'stream';
// Parse CSV content from a string
const parseCSV = (csvContent) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const readableStream = Readable.from(csvContent); // Convert string to readable stream

    readableStream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Convert array of objects to CSV string
const convertToCSV = async (data) => {
  if (data.length === 0) return '';

  const csvStringifier = createObjectCsvStringifier({
    header: Object.keys(data[0]).map(key => ({ id: key, title: key })),
  });

  return csvStringifier.stringifyRecords(data);
};

export { parseCSV, convertToCSV };
