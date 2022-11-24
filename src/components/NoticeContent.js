import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NoticeListContext } from '../App';

const NoticeContent = () => {
    const contentRef = useRef();
    const navigate = useNavigate();
    const [noticeContent, setNoticeContent] = useState({
        id: 0,
        index: 0,
        title: "",
        writer: "",
        content: "",
        reg_date: "",
    });

    const noticeData = useContext(NoticeListContext);

    const { id } = useParams();

    useEffect(() => {
        let index = 0;
        let selectedItem = noticeData.find((item, idx) => {
            index = idx;
            return parseInt(item.nseq) === parseInt(id)
        });
        setNoticeContent({ ...selectedItem, index });

    }, [id]);

    return (
        <>
            <div className='NoticeContent'>
                <div className='notice-title'>{noticeContent.title}</div>
                <div className='notice-writer'>작성자: {noticeContent.writer} | 작성일: {noticeContent.reg_date.slice(0, 10)}</div>
                <div className='notice-content' ref={contentRef}>{
                    noticeContent.content.split('<br/>').map(item => <div style={{ "marginBottom": "20px" }}>{item}</div>)
                }</div>
                <div className='other-list'>
                    <div className='next-page'>
                        <p>이전글</p>
                        {noticeContent.index != 0
                            ? <p onClick={() =>
                                navigate(`/notice/${noticeData[noticeContent.index - 1].nseq}`)}>{noticeData[noticeContent.index - 1].title}</p>
                            : <p>등록된 이전글이 없습니다.</p>}
                    </div>
                    <div className='next-page'>
                        <p>다음글</p>
                        {noticeContent.index != noticeData.length - 1
                            ? <p onClick={() =>
                                navigate(`/notice/${noticeData[noticeContent.index + 1].nseq}`)}>{noticeData[noticeContent.index + 1].title}</p>
                            : <p>등록된 다음글이 없습니다.</p>}
                    </div>
                </div>

                <div className='list-btn'>
                    <button className="send-btn" onClick={() => navigate('/notice')}>목록 보기</button>
                </div>
            </div>
        </>


    );
}

export default NoticeContent;