/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TODAY_DATE = new Date().toISOString().slice(0, 10);

const NARRATIVA_API = `https://api.covid19tracking.narrativa.com/api/${TODAY_DATE}`;

const initialState = {
  isFetching: false,
  data: [],
  error: {},
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
  reducers: {},
  extraReducers: {
    [getCovidData.pending.type]: (state) => ({ ...state, isFetching: true }),
    [getCovidData.fulfilled.type]: (state, action) => ({
      ...state,
      isFetching: false,
      data: action.payload,
      error: {},
    }),
    [getCovidData.rejected.type]: (state) => ({
      ...state,
      isFetching: false,
      error: {},
    }),
  },
});

export default covidDataSlice.reducer;
