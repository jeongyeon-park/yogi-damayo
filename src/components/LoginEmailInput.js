import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { API } from '../util/api'

const LoginEmailInput = () => {
    const [nickname, setNickName] = useState("");
    const [msg, setMsg] = useState(false);
    const { email } = useParams();
    const input = useRef();

    const postEmail = async () => {
        try {
            let res = await fetch(`${API}/registration`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail: email, nickname: nickname }),
            }).then((res) => res.json())
                .then((res) => {
                    if (res.statusCode == 201) {
                        setMsg(true);

                    } else if (res.statusCode == 200) {
                        sessionStorage.setItem("jwtToken", res.data["jwt token"]);
                        console.log(res);
                        document.location.href = '/';
                    }
                })

        } catch (e) {
            console.log(e);
        }
    }

    const btnClick = () => {
        if (nickname.trim().length) {
            postEmail();
        } else {
            input.target.focus();
        }
    }

    return (
        <div className='LoginEmailInput'>
            <p>안녕하세요 처음 오셨군요!</p>
            <p>회원가입을 위해 닉네임을 입력 해주세요</p>
            <input onChange={(e) => setNickName(e.target.value)} ref={input} />
            {msg ? <p>닉네임이 중복되었습니다. 다른 닉네임을 입력 해주세요.</p> : null}
            <div></div>
            <button onClick={btnClick}>입력 완료</button>
        </div>
    )



}

export default LoginEmailInput;