import { useEffect, useState } from "react";

const NoticeTable = () => {
    const [noticeList, setNoticeList] = useState([]);

    const getNoticeList = async () => {
        const res = await fetch("http://146.56.140.164:8080/notice"
        ).then((res) => res.json()
        ).then(data => setNoticeList(data.data));

    }

    // getNoticeList();

    useEffect(() => {
        getNoticeList()
    }, []);


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
                    {noticeList.map((item) => <tr style={{ "cursor": "pointer" }}><td>{item.nseq}</td><td className="thTitle">{item.title}</td><td>{item.writer}</td><td>{item.reg_date.slice(5, 10)}</td></tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default NoticeTable;