import React from 'react';
import axios from 'axios';
import { API } from '../util/api'
import { useNavigate } from 'react-router-dom';

const GrabAuth = () => {
    let auth_code = new URL(window.location.href).searchParams.get("code");

    const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_CALLBACK_URI}&code=${auth_code}`
    const navigate = useNavigate();

    const getAccessToken = async () => {
        try {
            const response = await axios.post(url, {});
            const accessToken = response.data.access_token;
            console.log(accessToken);
            getUserInfo(accessToken);
        } catch (e) {
            console.log(e);
        }
    }

    const getUserInfo = async (accessToken) => {
        try {
            const userInfo = await axios.get(`${API}/user/login/kakao?token=${accessToken}`)
            console.log(userInfo.data.token);

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

    getAccessToken();


    return (
        <div style={{ "textAlign": "center" }}>로그인 중입니다. </div>

    );
}

export default GrabAuth;