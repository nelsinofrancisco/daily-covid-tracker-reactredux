import { HiOutlineChevronLeft } from 'react-icons/hi';
import { BsGearWide } from 'react-icons/bs';

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

const Header = () => {
  const title = 'Home';

  return (
    <div style={headerStyles.container}>
      <HiOutlineChevronLeft />
      <p style={headerStyles.title}>{title}</p>
      <BsGearWide />
    </div>
  );
};

export default Header;
