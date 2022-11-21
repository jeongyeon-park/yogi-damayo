import React from 'react';
import axios from 'axios';
import { KAKAO_REDIRECT_URI } from './OAuth';
import { API } from '../util/api'
import { useNavigate } from 'react-router-dom';

const GrabAuth = () => {
    let auth_code = new URL(window.location.href).searchParams.get("code");
    //const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=7a8c9cf9e63bae4750c392fc2390e44b&redirect_uri=${KAKAO_REDIRECT_URI}&code=${auth_code}`;
    const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=7a8c9cf9e63bae4750c392fc2390e44b&redirect_uri=${KAKAO_REDIRECT_URI}&code=${auth_code}`
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
        <div>로그인 중입니다. </div>

    );
}

export default GrabAuth;