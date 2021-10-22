/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../../redux/configureStore';
import { selectRegion } from '../../redux/covidData/covidDataSlice';

const CountryRegions = () => {
  const {
    selected_country,
  } = useSelector((state) => state.covidData);
  const bcColors = ['var(--primary-bc-color)', 'var(--medium-bc-color)'];
  const { regions } = selected_country[0];

  if (selected_country[0].regions.length <= 0) {
    return (
      <div>
        <h2 style={{
          fontSize: '20px', marginBottom: '0.5rem', marginTop: '1rem', textAlign: 'center',
        }}
        >
          {`Total cases: ${selected_country[0].today_confirmed}`}
        </h2>
        <h2 style={{ fontSize: '20px', marginBottom: '0.5rem', textAlign: 'center' }}>{`Total new cases: ${selected_country[0].today_new_confirmed}`}</h2>
        <h2 style={{ fontSize: '20px', marginBottom: '1.5rem', textAlign: 'center' }}>{`Total new deaths: ${selected_country[0].today_new_deaths}`}</h2>
        <p style={{ fontSize: '10px', textAlign: 'center' }}> * API does not have data for the regions of this country </p>
      </div>
    );
  }
  return (
    <div>
      { regions.map((obj, index) => {
        document.querySelector('html').style.backgroundColor = bcColors[bcColors.length % (index + 1)];

        return (
          <div
            key={uuidv4()}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: `${bcColors[index % bcColors.length]}`,
              padding: '1rem 0.5rem',
            }}
            onClick={() => store.dispatch(selectRegion(obj.name))}
            onKeyDown={() => store.dispatch(selectRegion(obj.name))}
            role="button"
            tabIndex="0"
          >
            <h2 style={{ fontSize: '14px' }}>{ (obj.name.length > 13) ? (`${obj.name.slice(0, 13)}...`) : (obj.name) }</h2>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
            >
              <p style={{ fontSize: '14px', fontWeight: '600', marginRight: '0.5rem' }}>{obj.today_confirmed}</p>
              <p style={{ fontSize: '14px', fontWeight: '600' }}>Total Cases</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountryRegions;
