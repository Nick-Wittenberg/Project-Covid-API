const geoIdToCca2 = (geoId) => {
  let key;
  switch (geoId) {
    case 'EL':
      key = 'GR';
      break;
    case 'UK':
      key = 'GB';
      break;
    default:
      key = geoId;
      break;
  }

  return key;
};

export default geoIdToCca2;
