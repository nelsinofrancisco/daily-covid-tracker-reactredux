import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowRightCircle } from 'react-icons/bs';
import store from '../../redux/configureStore';
import { selectContinent } from '../../redux/covidData/covidDataSlice';

const continents = ['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Australia'];
const bcColors = ['var(--lighter-bc-color)', 'var(--medium-bc-color)', 'var(--primary-bc-color)', 'var(--darker-bc-color)'];

const HomeContinents = () => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    color: '#fff',
    borderTop: '2px solid var(--darker-bc-color)',
  }}
  >
    { continents.map((continent, index) => {
      document.querySelector('html').style.backgroundColor = bcColors[bcColors.length % (index + 1)];
      return (
        <NavLink
          key={uuidv4()}
          to={`/continent/${continent}`}
          onClick={() => store.dispatch(selectContinent(continent))}
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
              <h2 style={{ fontSize: '14px' }}>{continent}</h2>
              <p style={{ fontSize: '14px', fontWeight: '600' }}>view more</p>
            </div>
          </div>
        </NavLink>
      );
    })}
  </div>
);

export default HomeContinents;
