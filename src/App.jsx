
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scanners from './components/scanners';
import Home from './components/Home';
import GetBagById from './components/getBagById';
import UpdateBagLocation from './components/updateBagLocation';
import Dashboard from './components/dashboard';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/scanner" element={<Scanners />} /> 
        <Route path="/bagById" element={<GetBagById />} /> 
        <Route path="/updatebagLocation" element={<UpdateBagLocation />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
