/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import countryList from '../../utils/countriesList';

const TODAY_DATE = new Date().toISOString().slice(0, 10);

const NARRATIVA_API = `https://api.covid19tracking.narrativa.com/api/${TODAY_DATE}`;

const initialState = {
  isFetching: false,
  data: [],
  error: {},
  continent: null,
  continent_countries: [],
  filtered_country: false,
  country: null,
  selected_country: [],
  region: null,
};

export const getCovidData = createAsyncThunk(
  'redux/rockets/rocketsSlice',
  async () => {
    const response = await axios.get(NARRATIVA_API).catch((error) => error);

    const data = {};

    data.countries = Object.values(response.data.dates[TODAY_DATE].countries);
    data.total = response.data.total;

    return data;
  },
);

const covidDataSlice = createSlice({
  name: 'covidData',
  initialState,
  reducers: {
    selectContinent: (state, action) => ({ ...state, continent: action.payload }),
    selectCountry: (state, action) => {
      const countryRegions = state.continent_countries.filter(
        (country) => action.payload === country.name,
      );
      return { ...state, country: action.payload, selected_country: [...countryRegions] };
    },
    selectRegion: (state, action) => ({ ...state, region: action.payload }),
    filterCountries: (state, action) => {
      const continent_countries = state.data.countries.filter(
        (obj) => countryList[action.payload].includes(obj.id),
      );
      return { ...state, continent_countries: [...continent_countries] };
    },
    filterCountry: (state, action) => {
      const filtered_country = state.continent_countries.filter(
        (obj) => obj.id.includes(action.payload),
      );
      return { ...state, filtered_country: [...filtered_country] };
    },
    clearFilter: (state) => ({ ...state, filtered_country: false }),
  },
  extraReducers: {
    [getCovidData.pending.type]: (state) => ({ ...state, isFetching: true }),
    [getCovidData.fulfilled.type]: (state, action) => ({
      ...state,
      isFetching: false,
      data: action.payload,
      error: {},
    }),
    [getCovidData.rejected.type]: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.payload,
    }),
  },
});

export const {
  selectContinent, filterCountries, selectCountry, filterCountry,
  clearFilter, selectRegion,
} = covidDataSlice.actions;
export default covidDataSlice.reducer;
