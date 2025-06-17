import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>RumbleRacers</h1>
    <Link to="/game">
      <button style={{ fontSize: '1.5rem', padding: '1rem' }}>Start Game</button>
    </Link>
  </div>
);

export default Home;