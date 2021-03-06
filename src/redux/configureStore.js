import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import covidDataSlice from './covidData/covidDataSlice';

const reducer = combineReducers({
  covidData: covidDataSlice,
  // additional reducers could be added here
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
