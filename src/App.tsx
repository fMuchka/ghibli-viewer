import './App.css'

import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Films from "./pages/Films"
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <Navigation />

      <Routes>
          <Route path='/*' element={<Home />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/films"}  element={<Films />} />
      </Routes>
    </div>
  )
}

export default App
