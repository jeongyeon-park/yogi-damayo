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

import React, { useState, useEffect } from 'react';

import { API } from './util/api';
import Login from './pages/Login';
import UserLogin from './pages/UserLogin';
import GrabAuthNaver from './components/GrabAuthNaver';
import LoginEmailInput from './components/LoginEmailInput';
import Community from './pages/Community';
import SearchCommunity from './pages/SearchCommunity';
import Room from './pages/Room';

export const NoticeListContext = React.createContext();
export const NickNameContext = React.createContext();

function App() {

  const [noticeList, setNoticeList] = useState([]);

  const getNoticeList = async () => {
    const res = await fetch(`${API}/notice`
    ).then((res) => res.json()
    ).then(data => setNoticeList(data.data));
  }

  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem('jwtToken'));
  const [userInfo, setUserInfo] = useState({ "nickname": "", "email": "" });

  const postToken = async () => {
    try {
      let res = await fetch(`${API}/user/token`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: jwtToken })
      }).then((res) => res.json())
        .then(res => {
          if (res.statusCode == 200) {
            setUserInfo(res.data);
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getNoticeList();
    setJwtToken(sessionStorage.getItem('jwtToken'));
  }, []);

  useEffect(() => {
    if (jwtToken) {
      postToken()
    }
  }, [])

  return (
    <NoticeListContext.Provider value={noticeList}>
      <NickNameContext.Provider value={userInfo}>
        <BrowserRouter>
          <div className='App'>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/oauth/kakao/callback" element={<GrabAuth />} />
              <Route path="/oauth/naver/callback" element={<GrabAuthNaver />} />
              <Route path='/oauth/nickname/:email' element={<LoginEmailInput />} />
              <Route path="/info/:id" element={<Info />}></Route>
              <Route path="/yogimoyo" exac element={<Community />}></Route>
              <Route path='/yogimoyo/search' element={<SearchCommunity />}></Route>
              <Route path='/yogimoyo/room/:rum' element={<Room />}></Route>
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
      </NickNameContext.Provider>
    </NoticeListContext.Provider>

  );

}

export default App;
