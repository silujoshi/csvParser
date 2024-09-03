import { parseCSV, convertToCSV } from '../modules/Parser.js';
import { expect } from 'chai';
import fs from 'fs';

const sampleCSV = 'name,address,dob\nJohn Doe,New York,1992-12-03\nJane Doe,Kathmandu,1999-09-30';

describe('CSV Parser', () => {
  it('should parse CSV to object array', async () => {
    fs.writeFileSync('./test.csv', sampleCSV);
    const objects = await parseCSV(fs.readFileSync('./test.csv', 'utf8'));
    expect(objects).to.deep.equal([
      { name: 'John Doe', address: 'New York', dob: '1992-12-03' },
      { name: 'Jane Doe', address: 'Kathmandu', dob: '1999-09-30' }
    ]);
  });

  it('should parse object array to CSV', async () => {
    const objects = [
      { name: 'John Doe', address: 'New York', dob: '1992-12-03' },
      { name: 'Jane Doe', address: 'Kathmandu', dob: '1999-09-30' }
    ];
    const csvData = await convertToCSV(objects);
    expect(csvData).to.equal('name,address,dob\nJohn Doe,New York,1992-12-03\nJane Doe,Kathmandu,1999-09-30\n');
  });
});
