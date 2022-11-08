import { useEffect, useState, useRef } from "react";

const Question = ({ setSubmitTrue }) => {

    const [data, setData] = useState({
        email: "",
        title: "",
        content: ""
    });

    const [error, setError] = useState({
        emailAlert: "",
        titleAlert: "",
        contentAlert: "",
        checkAlert: ""
    });

    const inputRef = useRef([]);
    const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    const handleChangeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleValidation = () => {
        return error.emailAlert || error.titleAlert || error.contentAlert || error.checkAlert;
    }

    const postData = async () => {
        const res = await fetch('http://146.56.140.164:8080/suggestion', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        ).then((res) => res.json());

        if (res.statusCode == 200) {
            setSubmitTrue();
        }
        console.log(res);
    }

    const handleSubmit = () => {
        setError({
            emailAlert: "",
            titleAlert: "",
            contentAlert: "",
            checkAlert: ""
        });
        if (!data.email.length) {
            inputRef.current[0].classList.add("focus");
            setError({ ...error, emailAlert: "이메일을 입력해 주세요." });
        } else if (!emailCheck.test(data.email)) {
            inputRef.current[0].classList.add("focus");
            setError({ ...error, emailAlert: "유효한 이메일을 입력해 주세요." });
        }
        if (!data.title.length) {
            inputRef.current[2].classList.add("focus");
            setError({ ...error, titleAlert: "제목을 입력해 주세요." });
        }
        if (!data.content.length) {
            inputRef.current[4].classList.add("focus");
            // inputRef.current[5].innerText = "질문내용을 입력해 주세요.";
            setError({ ...error, contentAlert: "질문내용을 입력해 주세요." });
        }
        if (!inputRef.current[6].checked) {
            // inputRef.current[7].innerText = "개인정보 수집 및 이용에 동의해 주세요.";
            setError({ ...error, checkAlert: "개인정보 수집 및 이용에 동의해 주세요." });
        }

    };

    return (
        <>
            <div className='Question'>
                <div className='info'>
                    <div>'요기 담아요'에 관해 궁금한 점이 있으면 언제든 문의 주세요.</div>
                    <div>문의에 대한 답변을 받기 위해서는, 아래 이메일을 입력 해야 합니다.</div>
                    <div style={{ "fontWeight": "bold" }}>정확하게 작성 한 후에 문의하기를 눌러주세요.</div>
                    <div>문의에 대한 답변은 등록 해 주신 이메일로 보내드립니다.</div>
                    <div>최대한 빠르게 답변 드리고 있으나, 문의가 많을 경우 시간이 소요될 수 있습니다.</div>
                    <div>✅모든 항목은 필수 입력 항목입니다.</div>
                </div>
                <table className="form">
                    <tbody>

                        <tr>
                            <td className="form-title">답변방법</td>
                            <td className="form-contents">
                                * 이메일로 답변 받기
                            </td>
                        </tr>
                        <tr>
                            <td className="form-title">이메일</td>
                            <td className="form-contents">
                                <input className="input-style" ref={(item) => (inputRef.current[0] = item)} name="email" onChange={handleChangeData} />
                                <div className="input-alert">{error.emailAlert}</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="form-title">제목</td>
                            <td className="form-contents">
                                <input className="input-style" ref={(item) => (inputRef.current[2] = item)} name="title" onChange={handleChangeData} />
                                <div className="input-alert">{error.titleAlert}</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="form-title">질문내용</td>
                            <td className="form-contents">
                                <textarea className="input-style" ref={(item) => (inputRef.current[4] = item)} name="content" onChange={handleChangeData} />
                                <div className="input-alert">{error.contentAlert}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="checkBox">
                    <input type="checkbox" ref={(item) => (inputRef.current[6] = item)} />
                    <label>개인정보 수집 및 이용에 동의합니다.</label>
                    <div className="input-alert">{error.checkAlert}</div>
                </div>
                <div className="send-btn-wrap">
                    <button className="send-btn" onClick={handleSubmit} >문의하기</button>
                </div>
            </div>
        </>
    );
}

export default Question;