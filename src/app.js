import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import React, { useEffect } from 'react';
import store from './redux/configureStore';
import { getCovidData } from './redux/covidData/covidDataSlice';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ContinentPage from './components/ContinentPage';
import CountryPage from './components/CountryPage';

const App = () => {
  useEffect(() => {
    store.dispatch(getCovidData());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <HomePage />
        </Route>
        <Route exact path="/continent/:continent">
          <Header />
          <ContinentPage />
        </Route>
        <Route exact path="/continent/:continent/country/:country">
          <Header />
          <CountryPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
