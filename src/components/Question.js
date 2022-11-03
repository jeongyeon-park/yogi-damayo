import { useEffect, useState, useRef } from "react";

const Question = ({ setSubmitTrue }) => {

    const [data, setData] = useState({
        email: "",
        title: "",
        content: ""
    });

    let inputEmail = useRef();
    let inputTitle = useRef();
    let inputContent = useRef();

    const handleChangeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

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
        if (!data.email.length) {
            inputEmail.current.focus();
            return;
        }
        if (!data.title.length) {
            inputTitle.current.focus();
            return;
        }
        if (!data.content.length) {
            inputContent.current.focus();
            return;
        }
        postData();
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
                                <input className="input-style" ref={inputEmail} name="email" onChange={handleChangeData} />
                            </td>
                        </tr>
                        <tr>
                            <td className="form-title">제목</td>
                            <td className="form-contents">
                                <input className="input-style" ref={inputTitle} name="title" onChange={handleChangeData} />
                            </td>
                        </tr>
                        <tr>
                            <td className="form-title">질문내용</td>
                            <td className="form-contents">
                                <textarea className="input-style" ref={inputContent} name="content" onChange={handleChangeData} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="checkBox">
                    <input type="checkbox" />
                    <label>개인정보 수집 및 이용에 동의합니다.</label>
                </div>
                <div className="send-btn-wrap">
                    <button className="send-btn" onClick={handleSubmit} >문의하기</button>
                </div>
            </div>
        </>
    );
}

export default Question;