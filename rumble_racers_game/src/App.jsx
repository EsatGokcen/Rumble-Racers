import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameCanvas from './components/gameCanvas';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameCanvas />} />
      </Routes>
    </Router>
  );
}

export default App;