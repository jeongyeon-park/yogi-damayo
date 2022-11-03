import Question from '../components/Question';
import Header from '../components/Header';
import { useState } from 'react';

const BulletinBoard = () => {
    const [submitted, setSubmitted] = useState(false);

    const setSubmitTrue = () => {
        setSubmitted(true);
    }


    return (
        <div className='BulletinBoard'>
            <Header />
            {submitted ? <SubmittedPage /> : <Question setSubmitTrue={setSubmitTrue} />}
        </div>
    );
}

const SubmittedPage = () => {
    return (
        <div className="submitted-page">
            <div>문의하신 내용이 정상적으로 접수 되었습니다.</div>
            <div>문의하신 사항에 대해 정확히 확인하고</div>
            <div><span style={{ "fontWeight": "bold" }}></span> 로 빠르게 답변 메일 드리도록 하겠습니다.</div>
            <div>요기 담아요를 이용해 주셔서 감사합니다.</div>
            <div>🍀</div>
            <button>확인</button>
        </div>
    );
}



export default BulletinBoard;