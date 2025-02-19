import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import Prompt from './Prompt.jsx';
import Footer from './components/Footer';

function App() {
  return (
    <Router> {/* Wrap everything with Router */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/prompt" element={<Prompt />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;