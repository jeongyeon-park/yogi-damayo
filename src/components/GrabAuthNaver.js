import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { API } from '../util/api'

const GrabAuthNaver = () => {
    const navigate = useNavigate();

    const accessToken = window.location.href.split('=')[1].split('&')[0];

    const getJwtToken = async () => {
        try {
            const userInfo = await axios.get(`${API}/user/login/naver`,
                {
                    headers: {
                        access_token: `${accessToken}`
                    }
                })
            //sessionStorage.setItem('jwtToken', userInfo.data['jwt token']);
            console.log(userInfo);
            if (userInfo.data.statusCode == 203) {
                navigate(`/oauth/nickname/${userInfo.data.data}`);
            } else if (userInfo.data.statusCode == 200) {
                console.log(userInfo);
                sessionStorage.setItem("jwtToken", userInfo.data.data["jwt token"])
                document.location.href = '/';
            }
        } catch (e) {
            console.log(e);
        }

    }

    getJwtToken();

    return (
        <>
            <div style={{ "textAlign": "center" }}>로그인 중입니다</div>
        </>
    );
}

export default GrabAuthNaver