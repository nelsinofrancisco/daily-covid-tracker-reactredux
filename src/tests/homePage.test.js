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
import { getCovidData } from '../redux/covidData/covidDataSlice';
import Header from '../components/Header';
import HomePage from '../components/HomePage';

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
  });
});
