import geoIdName from './geoIdName';
import geoIdEmoji from './geoIdEmoji';
import geoIdLatLng from './geoIdLatLng';

const calcSummaries = (records /** array */) => {
  let summaries = [];
  const summariesObject = {};

  for (let record of records) {
    const { geoId, cases, deaths } = record;

    if (summariesObject[geoId]) {
      summariesObject[geoId].cases += parseInt(cases);
      summariesObject[geoId].deaths += parseInt(deaths);
    } else {
      const {
        geoId,
        dateRep,
        day,
        month,
        year,
        cases,
        deaths,
        countriesAndTerritories,
        countryterritoryCode: cca3
      } = record;

      const [lat,lng] = geoIdLatLng(geoId);

      summariesObject[geoId] = {
        _id: geoId,
        geoId,
        name: geoIdName(geoId, countriesAndTerritories),
        emoji: geoIdEmoji(geoId),
        cases: parseInt(cases),
        deaths: parseInt(deaths),
        date: dateRep.split('/').reverse().join('-'),
        day,
        month,
        year,
        lat,
        lng
      };
    }
  }

  for (let summary in summariesObject) {
    summaries.push(summariesObject[summary]);
  }
  console.log(summaries);

  return summaries;
};

export default calcSummaries;
