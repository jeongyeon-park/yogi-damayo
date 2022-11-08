import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NoticeListContext } from '../App';

const NoticeContent = () => {
    const navigate = useNavigate();
    const [noticeContent, setNoticeContent] = useState({
        id: 0,
        index: 0,
        title: "",
        writer: "",
        content: "",
        reg_date: "",
    });
    const [preContent, setPreContent] = useState({});
    const [nextContent, setNextContent] = useState({});

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
                <div className='notice-content'>{noticeContent.content}</div>
                <div className='other-list'>
                    <div>
                        <p>이전글</p>
                        {noticeContent.index != 0
                            ? <p onClick={() =>
                                navigate(`/notice/${noticeData[noticeContent.index - 1].nseq}`)}>{noticeData[noticeContent.index - 1].title}</p>
                            : <p>등록된 이전글이 없습니다.</p>}
                    </div>
                    <div>
                        <p>다음글</p>
                        {noticeContent.index != noticeContent.length - 1
                            ? <p onClick={() =>
                                navigate(`/notice/${noticeData[noticeContent.index + 1].nseq}`)}>{noticeData[noticeContent.index + 1].title}</p>
                            : <p>등록된 다음글이 없습니다.</p>}
                    </div>
                </div>

                <div className='list-btn'>
                    <button className="send-btn" onClick={() => navigate('/notice')}>목록</button>
                </div>
            </div>
        </>


    );
}

export default NoticeContent;