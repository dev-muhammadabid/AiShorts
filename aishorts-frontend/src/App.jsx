import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import Prompt from './Prompt';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Navbar/>
      <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/prompt" element={<Prompt />} />
      </Routes>
    </Router>
      <Footer/>
    </>
  )
}

export default App;
