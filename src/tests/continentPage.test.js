import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import {
  render, fireEvent, screen,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/configureStore';
import '@testing-library/jest-dom';
import {
  filterCountries, filterCountry, getCovidData, selectContinent,
} from '../redux/covidData/covidDataSlice';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import ContinentPage from '../components/ContinentPage';

jest.mock('./fetchMock.js');

describe('Home page tests', () => {
  test('HomePage matches snapshot', async () => {
    await store.dispatch(getCovidData());
    const homePage = act(async () => renderer
      .create(
        <Provider store={store}>
          <Router>
            <Header />
            <HomePage />
          </Router>
        </Provider>,
      )
      .toJSON());
    expect(homePage).toMatchSnapshot();
  });

  describe('Link Interaction', () => {
    test('Check how many continent links are in the page => should be 6', () => {
      act(() => {
        render(
          <Provider store={store}>
            <Router>
              <Header />
              <HomePage />
            </Router>
          </Provider>,
        );
      });
      screen.queryAllByRole('link').forEach((role) => expect(role).toBeInTheDocument());
      expect(screen.queryAllByRole('link').length).toBe(6);
    });
    test('Fire continent view more', () => {
      act(() => {
        render(
          <Provider store={store}>
            <Router>
              <Header />
              <HomePage />
            </Router>
          </Provider>,
        );
      });
      fireEvent.select(screen.getByText('South America'));
      expect(screen.getByText('South America')).toBeInTheDocument();
    });
    test('Test if new page is rendered', async () => {
      await store.dispatch(selectContinent('South America'));
      await store.dispatch(filterCountries('South America'));
      const homePage = act(async () => renderer
        .create(
          <Provider store={store}>
            <Router>
              <Header />
              <ContinentPage />
            </Router>
          </Provider>,
        )
        .toJSON());
      expect(homePage).toMatchSnapshot();
    });
  });
  describe('Test Filter', () => {
    test('Test match by Brazil => since there is only one brazil country this should have a length of 1', async () => {
      await store.dispatch(filterCountry('brazil'));
      act(async () => {
        await render(
          <Provider store={store}>
            <Router>
              <Header />
              <ContinentPage />
            </Router>
          </Provider>,
        );
      });
      expect(screen.queryAllByRole('link').length).toBe(1);
    });
  });
});
