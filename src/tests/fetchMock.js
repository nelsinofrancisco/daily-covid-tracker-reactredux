const axios = require('axios');

const TODAY_DATE = new Date().toISOString().slice(0, 10);
const NARRATIVA_API = `https://api.covid19tracking.narrativa.com/api/${TODAY_DATE}`;

const getCovidData = async () => {
  const response = await axios.get(NARRATIVA_API).catch((error) => error);

  const data = {};

  data.countries = Object.values(response.data.dates[TODAY_DATE].countries);
  data.total = response.data.total;

  return data;
};

export default getCovidData;
