/* eslint-disable no-alert */
/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
// import store from '../../redux/configureStore';

const CountryRegions = () => {
  const {
    continent,
    selected_country,
  } = useSelector((state) => state.covidData);
  const bcColors = ['var(--primary-bc-color)', 'var(--medium-bc-color)'];
  const { regions } = selected_country[0];

  if (selected_country[0].regions.length <= 0) {
    return (
      <h1>
        No Regions Found
      </h1>
    );
  }
  return (
    <div>
      { regions.map((obj, index) => {
        document.querySelector('html').style.backgroundColor = bcColors[bcColors.length % (index + 1)];

        return (
          <NavLink
            key={uuidv4()}
            to={`/continent/${continent}/country/${obj.name}/regions`}
            // onClick={() => store.dispatch(selectCountry(obj.name))}
            className="active"
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: `${bcColors[index % bcColors.length]}`,
              padding: '1rem 0.5rem',
            }}
            >
              <h2 style={{ fontSize: '14px' }}>{ (obj.name.length > 13) ? (`${obj.name.slice(0, 13)}...`) : (obj.name) }</h2>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
              }}
              >
                <p style={{ fontSize: '14px', fontWeight: '600', marginRight: '0.5rem' }}>{obj.today_confirmed}</p>
                <p style={{ fontSize: '14px', fontWeight: '600' }}>Today new Cases</p>
              </div>
              <BsArrowRightCircle />
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default CountryRegions;
