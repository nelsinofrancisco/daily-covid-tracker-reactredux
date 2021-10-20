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
        <Route path="*">
          <></>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
