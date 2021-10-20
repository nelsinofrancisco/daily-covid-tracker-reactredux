/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import Banner from '../../assets/covid-photo.jpg';

const containerHeight = window.innerWidth * 0.56266666666666666666666666666667;

const HomeStyles = {
  container: {
    position: 'relative',
    backgroundColor: 'var(--lighter-bc-color)',
    height: `${containerHeight}px`,
  },
  img: {
    width: '100%',
  },
  statContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '1rem',
    right: '0.5rem',
  },
  title: {
    fontFamily: 'var(--title-font)',
    fontWeight: '500',
    fontSize: '16px',
    textAlign: 'right',
    marginBottom: '0.5rem',
  },
  dataTitle: {
    fontFamily: 'var(--title-font)',
    fontWeight: '400',
    fontSize: '12px',
    textAlign: 'right',
  },
  subTitle: {
    fontFamily: 'var(--title-font)',
    fontWeight: '400',
    fontSize: '14px',
    textAlign: 'right',
  },
};

const HomeBanner = () => {
  const { today_confirmed } = useSelector((state) => {
    if (state.covidData.data.total) {
      return state.covidData.data.total;
    }
    return 'loading';
  });

  return (
    <div style={HomeStyles.container}>
      <img style={HomeStyles.img} src={Banner} alt="" />
      <div style={HomeStyles.statContainer}>
        <h1 style={HomeStyles.title}>Covid Tracker</h1>
        <h2 style={HomeStyles.dataTitle}>{today_confirmed}</h2>
        <p style={HomeStyles.subTitle}>cases</p>
      </div>
    </div>
  );
};

export default HomeBanner;
