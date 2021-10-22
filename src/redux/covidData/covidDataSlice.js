/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import countryList from '../../utils/countriesList';

const TODAY_DATE = '2021-10-21';

const NARRATIVA_API = `https://api.covid19tracking.narrativa.com/api/${TODAY_DATE}`;

const initialState = {
  isFetching: false,
  data: [],
  error: {},
  continent: null,
  continentCountries: [],
  filtered_country: false,
  country: null,
  selected_country: [],
  city: null,
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
      const countryRegions = state.continentCountries.filter(
        (country) => action.payload === country.name,
      );
      return { ...state, country: action.payload, selected_country: [...countryRegions] };
    },
    filterCountries: (state, action) => {
      const continentCountries = state.data.countries.filter(
        (obj) => countryList[action.payload].includes(obj.id),
      );
      return { ...state, continentCountries: [...continentCountries] };
    },
    filterCountry: (state, action) => {
      const filtered_country = state.continentCountries.filter(
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
  clearFilter,
} = covidDataSlice.actions;
export default covidDataSlice.reducer;
