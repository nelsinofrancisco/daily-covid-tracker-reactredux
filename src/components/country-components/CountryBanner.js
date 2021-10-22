/* eslint-disable camelcase */
import { useSelector } from 'react-redux';

const Styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1.5rem 0.5rem',
    backgroundColor: 'var(--lighter-bc-color)',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  CountryHeader: {
    padding: '0.5rem',
    backgroundColor: 'var(--medium-bc-color)',
  },
};

const CountryBanner = () => {
  const { country, selected_country } = useSelector((state) => state.covidData);

  return (
    <>
      <div style={Styles.container}>
        <div style={Styles.textContainer}>
          <h2 style={{ marginBottom: '0.5rem' }}>{ country }</h2>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '14px' }}>{ (selected_country[0].regions.length > 0) ? `Total Cases: ${selected_country[0].today_confirmed}` : '' }</h2>
        </div>
      </div>
      <div style={Styles.CountryHeader}>
        List of Regions
      </div>
    </>
  );
};

export default CountryBanner;
