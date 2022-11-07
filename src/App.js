import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Notice from './pages/Notice';
import BulletinBoard from './pages/BulletinBoard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoticeContent from './components/NoticeContent';

import React, { useState, useContext } from 'react';

export const NoticeListContext = React.createContext();

function App() {

  const [noticeList, setNoticeList] = useState([]);

  const getNoticeList = async () => {
    const res = await fetch("http://146.56.140.164:8080/notice"
    ).then((res) => res.json()
    ).then(data => setNoticeList(data.data));

  }

  useState(() => { getNoticeList() }, []);

  return (
    <NoticeListContext.Provider value={noticeList}>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/notice" exact element={<Notice />}></Route>
            <Route path="/notice/:id" element={<NoticeContent />}></Route>
            <Route path="/question" element={<BulletinBoard />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </NoticeListContext.Provider>

  );

}

export default App;
