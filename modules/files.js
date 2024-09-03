import { promises as fs } from 'fs';

const readFileContent = async (filePath) => {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return data;
    } catch (err) {
      console.error('Error reading file:', err);
      throw (message.err);
    }
  };


const writeFileContent = async (filePath, data) => {
    try {
      if (!filePath) {
        throw new Error('File path is not provided');
      }
      await fs.writeFile(filePath, data, 'utf-8');
    } catch (err) {
      console.error('Error writing file:', err);
      throw err;
    }
  };

export { readFileContent, writeFileContent };
