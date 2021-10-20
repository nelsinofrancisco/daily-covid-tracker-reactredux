/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import { GoTriangleUp } from 'react-icons/go';

const HomeStatsStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  statsHeader: {
    background: 'linear-gradient(145deg, rgba(57,88,146,1) 17%, rgba(85,132,219,1) 52%, rgba(57,88,146,1) 87%)',
    padding: '0.5rem',
  },
  statsHeaderTitle: {
    fontFamily: 'var(--title-font)',
    fontWeight: '500',
    fontSize: '14px',
  },
  displayFlex: {
    display: 'flex',
  },
  flexGrow: {
    flexGrow: '1',
  },
  backgroundLight: {
    backgroundColor: 'var(--lighter-bc-color)',
    padding: '0.5rem',
  },
  statHeaderCases: {
    fontFamily: 'var(--title-font)',
    fontWeight: '300',
    fontSize: '12px',
    textAlign: 'center',
  },
  statHeaderAux: {
    fontFamily: 'var(--title-font)',
    fontWeight: '300',
    fontSize: '12px',
    textAlign: 'center',
    marginBottom: '0.2rem',
  },
};

const HomeStats = () => {
  const {
    today_confirmed,
    today_deaths,
    today_new_confirmed,
    today_new_deaths,
    yesterday_confirmed,
    yesterday_deaths,
  } = useSelector((state) => {
    if (state.covidData.data.total) {
      return state.covidData.data.total;
    }
    return 'loading';
  });

  const newCasesPercentage = ((parseInt(today_new_confirmed, 10) * 100)
  / parseInt(yesterday_confirmed, 10)).toFixed(4);

  const newDeathsPercentage = ((parseInt(today_new_deaths, 10) * 100)
  / parseInt(yesterday_deaths, 10)).toFixed(4);

  return (
    <div style={HomeStatsStyles.container}>
      <div style={HomeStatsStyles.statsHeader}>
        <h2 style={HomeStatsStyles.statsHeaderTitle}>Daily world cases</h2>
      </div>
      <div style={{ ...HomeStatsStyles.displayFlex, ...HomeStatsStyles.backgroundLight }}>
        <div style={HomeStatsStyles.flexGrow}>
          <h2 style={HomeStatsStyles.statHeaderCases}>{today_confirmed}</h2>
          <p style={HomeStatsStyles.statHeaderAux}>Confirmed cases</p>
        </div>
        <div style={HomeStatsStyles.flexGrow}>
          <h2 style={HomeStatsStyles.statHeaderCases}>{today_deaths}</h2>
          <p style={HomeStatsStyles.statHeaderAux}>Deaths</p>
        </div>
        <div style={HomeStatsStyles.flexGrow}>
          <h2 style={HomeStatsStyles.statHeaderCases}>{today_new_confirmed}</h2>
          <p style={HomeStatsStyles.statHeaderAux}>Today cases</p>
        </div>
        <div style={HomeStatsStyles.flexGrow}>
          <h2 style={HomeStatsStyles.statHeaderCases}>{today_new_deaths}</h2>
          <p style={HomeStatsStyles.statHeaderAux}>Today deaths</p>
        </div>
      </div>
      <div style={{ ...HomeStatsStyles.displayFlex, ...HomeStatsStyles.backgroundLight }}>
        <div style={{
          ...HomeStatsStyles.flexGrow, ...HomeStatsStyles.displayFlex, justifyContent: 'center', alignItems: 'center',
        }}
        >
          <div style={{ textAlign: 'center', marginRight: '0.5rem' }}>
            <h2 style={{ fontFamily: 'var(--title-font)', fontSize: '18px' }}>{today_new_confirmed}</h2>
            <p style={{ fontFamily: 'var(--title-font)', fontSize: '18px' }}>Infections</p>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--title-font)', fontSize: '12px', color: 'var(--secundary-font-color)',
            }}
            >
              {`+${newCasesPercentage}%`}
              <GoTriangleUp style={{ marginLeft: '0.3rem' }} />
            </p>
            <p style={{ fontFamily: 'var(--title-font)', fontSize: '12px', color: 'var(--secundary-font-color)' }}>from yesterday</p>
          </div>
        </div>
        <div style={{
          ...HomeStatsStyles.flexGrow, ...HomeStatsStyles.displayFlex, justifyContent: 'center', alignItems: 'center',
        }}
        >
          <div style={{ textAlign: 'center', marginRight: '0.5rem' }}>
            <h2 style={{ fontFamily: 'var(--title-font)', fontSize: '18px' }}>{today_new_deaths}</h2>
            <p style={{ fontFamily: 'var(--title-font)', fontSize: '18px' }}>Deaths</p>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--title-font)', fontSize: '12px', color: 'var(--secundary-font-color)',
            }}
            >
              {`+${newDeathsPercentage}%`}
              <GoTriangleUp style={{ marginLeft: '0.3rem' }} />
            </p>
            <p style={{ fontFamily: 'var(--title-font)', fontSize: '12px', color: 'var(--secundary-font-color)' }}>from yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStats;
