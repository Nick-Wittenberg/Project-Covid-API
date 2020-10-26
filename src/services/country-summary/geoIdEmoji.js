import geoIdToCca2 from './geoIdToCca2';
import countries from 'world-countries/countries.json';

const geoIdEmoji = (geoId) => {
  const cca2 = geoIdToCca2(geoId);
  const country = countries.find(c => c.cca2 == cca2);
  if (country && country.flag) {
    return country.flag;
  } else {
    return '🏳️‍🌈';
  }
};

export default geoIdEmoji;
