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

    }, []);

    return (
        <>
            <div className='NoticeContent'>
                <div className='notice-title'>{noticeContent.title}</div>
                <div className='notice-writer'>작성자: {noticeContent.writer} | 작성일: {noticeContent.reg_date.slice(0, 10)}</div>
                <div className='notice-content'>{noticeContent.content}</div>
                <div className='other-list'>
                    <div>
                        <p>이전글</p>
                        <p></p>
                    </div>
                    <div>
                        <p>다음글</p>
                        <p></p>
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