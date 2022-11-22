import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { API } from '../util/api';

const AdminLogin = () => {

    const [adminInfo, setAdminInfo] = useState({ "email": "", "pw": "" });

    const infoChangeHandler = (e) => {
        setAdminInfo((prev) => { return { ...prev, [e.target.name]: e.target.value } })
    }

    const admitCheckBtn = () => {
        console.log(adminInfo);
        if (adminInfo.email && adminInfo.pw) {
            postAdminLogin()
        }
    }

    const postAdminLogin = async () => {
        try {
            let res = await fetch(`${API}/token`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ eamil: adminInfo.email, pw: adminInfo.pw })
            }).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        console.log(res.data);
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="AdminLogin">
            <img src="/img/yogi_damayo_logo/AdminLogin.jpg" alt="adminLogo" style={{ "width": "40%" }} />
            <div className="title" style={{ "fontSize": "1.6rem", "margin": "20px 0" }}>요기 담아요</div>
            <div>관리자 로그인</div>

            <div className="logins">
                <div className='login-input'>
                    <FaUserAlt />
                    <span>이메일</span>
                    <input name="email" onChange={infoChangeHandler} />
                </div>
                <div className='login-input'>
                    <FaLock />
                    <span>비밀번호</span>
                    <input name="pw" type="password" onChange={infoChangeHandler} />
                </div>
            </div>

            <button className="loginBtn" onClick={admitCheckBtn}>로그인</button>
        </div>
    )
}

export default AdminLogin;