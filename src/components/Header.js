import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();




    const goNotice = (e) => {
        navigate("/notice");
    }

    const goHome = (e) => {
        navigate("/");

    }

    const goQuesiton = (e) => {
        navigate("/question");
    }

    return (
        <div className='Header'>
            <div onClick={goHome}>요기 담아요</div>
            <div className='sub-menu'>
                <div onClick={goNotice}>공지사항</div>
                <div >위치서비스</div>
                <div onClick={goQuesiton}>문의</div>
                <div>로그인</div>
            </div>
        </div>
    );
}

export default React.memo(Header);