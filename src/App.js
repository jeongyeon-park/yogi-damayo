import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Notice from './pages/Notice';
import BulletinBoard from './pages/BulletinBoard';
import Map from './pages/Map';
import Info from './pages/Info';
import GrabAuth from './components/GrabAuth';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoticeContent from './components/NoticeContent';

import React, { useState, useContext, useEffect } from 'react';

import { API } from './util/api';
import Login from './pages/Login';
import UserLogin from './pages/UserLogin';
import GrabAuthNaver from './components/GrabAuthNaver';
import LoginEmailInput from './components/LoginEmailInput';
import Community from './pages/Community';

export const NoticeListContext = React.createContext();

function App() {

  const [noticeList, setNoticeList] = useState([]);

  const getNoticeList = async () => {
    const res = await fetch(`${API}/notice`
    ).then((res) => res.json()
    ).then(data => setNoticeList(data.data));
  }

  useEffect(() => { getNoticeList() }, []);

  return (
    <NoticeListContext.Provider value={noticeList}>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/oauth/kakao/callback" element={<GrabAuth />} />
            <Route path="/oauth/naver/callback" element={<GrabAuthNaver />} />
            <Route path='/oauth/nickname/:email' element={<LoginEmailInput />} />
            <Route path="/info/:id" element={<Info />}></Route>
            <Route path="/yogimoyo" element={<Community />}></Route>
            <Route path="/notice" exact element={<Notice />}></Route>
            <Route path="/notice/:id" element={<NoticeContent />}></Route>
            <Route path="/question" element={<BulletinBoard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/map" element={<Map />}></Route>
            <Route path="/userLogin" element={<UserLogin />}></Route>
            {/* <Route path="/adminLogin" element={<AdminLogin />}></Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </NoticeListContext.Provider>

  );

}

export default App;
