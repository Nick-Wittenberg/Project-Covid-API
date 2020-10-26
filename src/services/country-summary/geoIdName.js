import geoIdToCca2 from './geoIdToCca2';
import countries from 'world-countries/countries.json';

const geoIdName = (geoId, countriesAndTerritories) => {
  const cca2 = geoIdToCca2(geoId);
  const country = countries.find(c => c.cca2 == cca2);
  if (country) {
    return country.name.common;
  } else {
    return countriesAndTerritories.split('_').join(' ');
  }
};

export default geoIdName;
