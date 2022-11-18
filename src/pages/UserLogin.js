import NaverLogin from "../components/NaverLogin";
import KakaoLoginBtn from "../components/KakaoLoginBtn";

import { useState } from "react";
import { API } from '../util/api';
import { useNavigate } from "react-router-dom";

const UserLogin = () => {

    const [url, setUrl] = useState();
    const navigate = useNavigate();

    const getNaverLoginUrl = async () => {
        const res = await fetch(`${API}/getNaverAuthUrl`).then((res) => {
            console.log(res);
            window.location.href = res;
        });
    }

    return (
        <>
            <div className="UserLogin">
                <div style={{ "fontSize": "1.6rem", "marginBottom": "20px" }}>요기 담아요</div>
                <div>회원 로그인</div>
                <div style={{ "marginTop": "30px", "marginBottom": "30px" }}>네이버 혹은 카카오톡으로 소셜 로그인 해 주세요</div>

                <div className="social-logins">
                    <NaverLogin />

                    <KakaoLoginBtn />
                </div>


            </div>

        </>
    );
}

export default UserLogin;