const bulkLoader = async (model, records /** array of records */) => {
  const bulkWrite = [];

  for (let record of records) {
    bulkWrite.push({
      insertOne: {
        document: record
      }
    });
  }

  await model.deleteMany({});
  const bulkWriteRes = await model.bulkWrite(bulkWrite);
  return bulkWriteRes;
};

export default bulkLoader;
