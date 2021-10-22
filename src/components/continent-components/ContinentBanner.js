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

const sumOfCasesHandler = (array) => {
  let sum = 0;

  array.forEach((country) => {
    sum += country.today_confirmed;
  });

  return sum;
};

const ContinentBanner = () => {
  const { continent, continent_countries } = useSelector(
    (state) => state.covidData,
  );

  return (
    <>
      <div style={Styles.container}>
        <div style={Styles.textContainer}>
          <h2 style={{ marginBottom: '0.5rem' }}>{continent}</h2>
          <h2
            style={{ marginBottom: '0.5rem', fontSize: '14px' }}
          >
            {`Total Cases: ${sumOfCasesHandler(continent_countries)}`}
          </h2>
        </div>
      </div>
      <div style={Styles.CountryHeader}>List of Countries</div>
    </>
  );
};

export default ContinentBanner;
