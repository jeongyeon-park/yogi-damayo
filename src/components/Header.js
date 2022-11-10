import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FaHome, FaBars } from "react-icons/fa";

const Header = () => {

    const navigate = useNavigate();

    const toggle = useRef();


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

    const onToggle = () => {
        toggle.current.classList.toggle('active');
        console.log(toggle.current);
    }
    return (
        <div className='Header'>
            <div className="left-menu" onClick={goHome}>
                <FaHome className='home-icon'></FaHome>
            </div>

            <ul className='middle-menu'>
                <li >위치서비스</li>
                <li onClick={goNotice}>공지사항</li>
                <li onClick={goQuesiton}>문의</li>
                <li>최근 검색 목록</li>
                <li>요기 모여요</li>
            </ul>

            <div className='right-menu'>
                <div onClick={goLogin}>로그인</div>
            </div>

            <div className='toggleBtn' ref={toggle} onClick={onToggle}>
                <FaBars ></FaBars>
            </div>
        </div>
    );
}

export default React.memo(Header);