import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FaHome, FaBars } from "react-icons/fa";

const Header = () => {

    const navigate = useNavigate();

    const menu = useRef();
    const icons = useRef();


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

    const onToggle = () => {
        menu.current.classList.toggle('active');
        icons.current.classList.toggle('active');
    }
    return (
        <div className='Header'>
            <div className="left-menu" onClick={goHome}>
                <img className='home-icon' src={"img/yogi_damayo_logo/yogi.jpg"} alt='logo' />
            </div>

            <ul className='middle-menu' ref={menu} >
                <li onClick={goMap}>위치서비스</li>
                <li onClick={goNotice}>공지사항</li>
                <li onClick={goQuesiton}>문의</li>
                <li >요기 모여요</li>
            </ul>

            <div className='right-menu' ref={icons}>
                <div onClick={goLogin}>로그인</div>
            </div>

            <div className='toggleBtn' onClick={onToggle}>
                <FaBars ></FaBars>
            </div>
        </div>
    );
}

export default React.memo(Header);