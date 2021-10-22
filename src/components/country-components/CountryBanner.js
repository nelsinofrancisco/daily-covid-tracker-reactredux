const Styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem',
    backgroundColor: 'var(--lighter-bc-color)',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  CountryHeader: {
    padding: '0.5rem',
    backgroundColor: 'var(--medium-bc-color)',
  },
};

const CountryBanner = () => (
  <>
    <div style={Styles.container}>
      <div style={Styles.textContainer}>
        <h2>Country</h2>
        <p>Total Cases Placeholder</p>
      </div>
    </div>
    <div style={Styles.CountryHeader}>
      List of Regions
    </div>
  </>
);

export default CountryBanner;
