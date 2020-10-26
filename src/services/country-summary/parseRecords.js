const parseRecords = (records /** array */) => {
  const idRecords = [];

  for (let record of records) {
    const { geoId, day, month, year } = record;
    const _id = `${geoId}-${year}${month}${day}`;
    record._id = _id;
    idRecords.push(record);
  }

  return idRecords;
};

export default parseRecords;
