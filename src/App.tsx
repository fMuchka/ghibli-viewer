import './App.css'

import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div
      style={{
        background: "#BFD7EA",
        height: "100vh",
        width: "100vw"
      }}
    >
      <Navigation />

      <Routes>
          <Route path='/*' element={<Home />} />
          <Route path={"/dashboard"}  element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
