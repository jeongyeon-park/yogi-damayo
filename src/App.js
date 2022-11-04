import './App.css';
import Header from './components/Header';
import { Reset } from 'styled-reset';
import Home from './pages/Home';
import Notice from './pages/Notice';
import BulletinBoard from './pages/BulletinBoard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/notice" element={<Notice />}></Route>
          <Route path="/question" element={<BulletinBoard />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App;
