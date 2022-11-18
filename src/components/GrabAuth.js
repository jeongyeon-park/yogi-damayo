import React, { useEffect } from 'react';
import { REDIRECT_URI } from './OAuth';

const GrabAuth = () => {
    let auth_code = new URL(window.location.href).searchParams.get("code");
    // const url = 'http://localhost:3000/oauth/callback/kakao';
    console.log(auth_code);

    const getAccessToken = async () => {
        try {
            const response = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=7a8c9cf9e63bae4750c392fc2390e44b&redirect_uri=${REDIRECT_URI}&code=${auth_code}`,
                {
                    method: "POST",
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                }).then(res => res.json())
                .then.then((data) => {
                    console.log(data)
                })
            console.log(response);
            const accessToken = response.data.access_token;
            console.log(accessToken);

            // getUserInfo(accessToken);
        } catch (e) {
            console.log(e);
        }
    }

    // const getUserInfo = async (accessToken) => {
    //     try {
    //         const userInfo = await axios.get('https://www.wannawalk.co.kr:8001/user/login/kakao/', {
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`
    //             },
    //         })
    //         console.log(userInfo.data.token);

    //         sessionStorage.setItem('jwtToken', userInfo.data.token);
    //         sessionStorage.getItem('jwtToken');

    //         document.location.href = '/';
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    getAccessToken();


    return (
        <div>로그인 중입니다. </div>

    );
}

export default GrabAuth;