import { useContext, useEffect, useState } from "react";
import { NoticeListContext } from '../App';
import { useNavigate } from 'react-router-dom';

const NoticeTable = () => {
    const noticeList = useContext(NoticeListContext);
    const navigate = useNavigate();

    return (
        <div className="NoticeTable">
            <table>
                <thead>
                    <tr style={{ "borderBottom": "2px solid black" }}>
                        <th>번호</th>
                        <th className="thTitle">제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {noticeList.map((item) => <tr onClick={() => navigate(`/notice/${item.nseq}`)} key={item.nseq} style={{ "cursor": "pointer" }}><td>{item.nseq}</td><td className="thTitle">{item.title}</td><td>{item.writer}</td><td>{item.reg_date.slice(5, 10)}</td></tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default NoticeTable;