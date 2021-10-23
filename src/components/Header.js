import { useRouteMatch } from 'react-router';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { BsGearWide } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const headerStyles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--primary-bc-color)',
    width: '100%',
    padding: '0.5rem',
  },
  title: {
    fontFamily: 'var(--title-font)',
    fontWeight: '300',
  },
};

const titleHandler = (path, continent, country, region) => {
  // Implement route to this later >>
  if (path.includes('/region/')) {
    return `${region}/cases`;
  }

  if (path.includes('/country/')) {
    return `${country}/cases`;
  }

  if (path.includes('/continent/')) {
    return `${continent}/cases`;
  }

  return 'Home';
};

const backLinkHandler = (path, continent, country) => {
  // Implement route to this later >>
  if (path.includes('/region/')) {
    return `/continent/${continent}/country/${country}`;
  }

  if (path.includes('/country/')) {
    return `/continent/${continent}/`;
  }

  if (path.includes('/continent/')) {
    return '/';
  }

  return '/';
};

const Header = () => {
  const { path } = useRouteMatch();
  const { continent, country, region } = useSelector((state) => state.covidData);

  const title = titleHandler(path, continent, country, region);

  return (
    <div style={headerStyles.container}>
      {
        (path === '/') ? (<span style={{ width: '16px' }} />) : (
          <NavLink
            to={backLinkHandler(path, continent, country)}
            className="active"
          >
            {' '}
            <HiOutlineChevronLeft />
          </NavLink>
        )
      }
      <p style={headerStyles.title}>{title}</p>
      <BsGearWide />
    </div>
  );
};

export default Header;
