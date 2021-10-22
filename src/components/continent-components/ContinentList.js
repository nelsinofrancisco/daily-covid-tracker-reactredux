/* eslint-disable no-alert */
/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import { IoIosCloseCircle } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import store from '../../redux/configureStore';
import {
  filterCountries,
  filterCountry,
  selectCountry,
  clearFilter,
} from '../../redux/covidData/covidDataSlice';

const ContinentList = () => {
  // eslint-disable-next-line no-unused-vars
  const {
    continent,
    continentCountries,
    filtered_country,
  } = useSelector((state) => state.covidData);
  const bcColors = ['var(--lighter-bc-color)', 'var(--medium-bc-color)', 'var(--primary-bc-color)', 'var(--darker-bc-color)'];
  const countries = (filtered_country) || continentCountries;

  useEffect(() => {
    store.dispatch(filterCountries(continent));
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          padding: '0.5rem',
          backgroundColor: 'var(--lighter-bc-color)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              store.dispatch(filterCountry(e.target.children[0].value.toLowerCase()));
              e.target.children[0].value = '';
            }}
            className="form-width"
          >
            <input className="dft-Input" placeholder="Filter by Country" />
            <button className="dft-Button" type="submit">Filter</button>
          </form>
          <p style={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}>{ (filtered_country.length > 0) ? filtered_country[0].name : ''}</p>
          { filtered_country
          && (
          <IoIosCloseCircle
            style={{ color: 'var(--close-btn-color)' }}
            size={20}
            onClick={() => { store.dispatch(clearFilter()); }}
          />
          )}
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        color: '#fff',
        borderTop: '2px solid var(--darker-bc-color)',
      }}
      >
        { countries.map((obj, index) => {
          document.querySelector('html').style.backgroundColor = bcColors[bcColors.length % (index + 1)];

          return (
            <NavLink
              key={uuidv4()}
              to={`/continent/${continent}/country/${obj.name}`}
              onClick={() => store.dispatch(selectCountry(obj.name))}
              className="active"
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '100%',
                flexGrow: '2',
                backgroundColor: `${bcColors[index % bcColors.length]}`,
                padding: '0.5rem',
              }}
              >
                <BsArrowRightCircle />
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
                >
                  <h2 style={{ fontSize: '14px' }}>{obj.name}</h2>
                  <p style={{ fontSize: '14px', fontWeight: '600' }}>{obj.today_confirmed}</p>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default ContinentList;
