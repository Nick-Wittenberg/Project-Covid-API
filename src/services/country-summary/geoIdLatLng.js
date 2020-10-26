import geoIdToCca2 from './geoIdToCca2';
import countries from 'world-countries/countries.json';

const geoIdLatLng = (geoId) => {
  const cca2 = geoIdToCca2(geoId);
  const country = countries.find(c => c.cca2 == cca2);
  if (country) {
    return country.latlng;
  } else {
    return [0,0];
  }
};

export default geoIdLatLng;
