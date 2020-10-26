const fs = require('fs');
const records = require('./covid-19-sample.json').records;

const sampleData = [];

for (const record of records) {
  const { geoId, day, month, year } = record;
  const _id = `${geoId}-${year}${month}${day}`;

  record._id = _id;
  console.log(record);

  sampleData.push(record);
}

fs.writeFileSync('covid-19-transformed.json', JSON.stringify(sampleData, null, 2));
