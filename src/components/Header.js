import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = () => {

    const navigate = useNavigate();

    const menu = useRef();
    const icons = useRef();

    const jwtToken = sessionStorage.getItem('jwtToken');

    const goNotice = (e) => {
        navigate("/notice");
    }

    const goHome = (e) => {
        navigate("/");

    }

    const goQuesiton = (e) => {
        navigate("/question");
    }

    const goLogin = (e) => {
        navigate("/login");
    }

    const goMap = (e) => {
        navigate("/map");
    }

    const goCommunity = (e) => {
        navigate("/yogimoyo")
    }

    const onToggle = () => {
        menu.current.classList.toggle('active');
        icons.current.classList.toggle('active');
    }

    const onLogOut = () => {
        sessionStorage.removeItem("jwtToken");
        localStorage.removeItem("com.naver.nid.oauth.state_token");
        window.location.href = '/';
    }
    return (
        <div className='Header'>
            <div className="left-menu" onClick={goHome}>
                <img className='home-icon' src={"/img/yogi_damayo_logo/yogi.jpg"} alt='logo' />
            </div>

            <ul className='middle-menu' ref={menu} >
                <li onClick={goMap}>위치서비스</li>
                <li onClick={goNotice}>공지사항</li>
                <li onClick={goQuesiton}>문의</li>
                <li onClick={jwtToken ? goCommunity : goLogin} >요기 모여요</li>
            </ul>

            <div className='right-menu' ref={icons}>
                {jwtToken ? <div onClick={onLogOut}>로그아웃</div> : <div onClick={goLogin}>로그인</div>}
            </div>

            <div className='toggleBtn' onClick={onToggle}>
                <FaBars ></FaBars>
            </div>
        </div>
    );
}

export default React.memo(Header);