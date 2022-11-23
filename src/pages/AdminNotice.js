import { useContext, useState, useEffect } from "react";
import { NoticeListContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft, FaArrowCircleRight, FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';

const AdminNotice = () => {

    const noticeList = useContext(NoticeListContext);
    const navigate = useNavigate();
    const [page, setPage] = useState({
        currentPage: 1, // 현재 클라이언트가 몇 페이지에 있는지 알려줌 
        posts: useContext(NoticeListContext),  // fetch 된 데이터 
        postsPerPage: 5
    });
    console.log(page);
    const handlePageNumbers = () => {
        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(page.posts.length / page.postsPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    const [indexOfLastPost, setIndexOfLastPost] = useState(page.currentPage * page.postsPerPage); // 현재페이지의 마지막 글
    const [indexOfFirstPost, setindexOfFirstPost] = useState(indexOfLastPost - page.postsPerPage); // 현재페이지의 첫번째 글 
    const [currentPosts, setCurrentPosts] = useState(noticeList.slice(indexOfFirstPost, indexOfLastPost));
    const [pageNumbers, setPageNumbers] = useState(handlePageNumbers);

    useEffect(() => {
        setIndexOfLastPost(page.currentPage * page.postsPerPage);
        setindexOfFirstPost(indexOfLastPost - page.postsPerPage);
        setCurrentPosts(page.posts.slice(indexOfFirstPost, indexOfLastPost));
        setPageNumbers(handlePageNumbers);
    }, [page, indexOfLastPost, indexOfFirstPost])

    return (
        <div className="NoticeTable">
            <div>공지사항 관리</div>
            <table className='notice-table'>
                <thead>
                    <tr style={{ "borderBottom": "2px solid black" }}>
                        <th>번호</th>
                        <th className="thTitle">제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((item) => (
                        <tr >
                            <td>{item.nseq}</td>
                            <td className="thTitle">{item.title}</td>
                            <td>{item.writer}</td>
                            <td>{item.reg_date.slice(2, 10)}</td>
                            <td><FaPencilAlt size={20} /></td>
                            <td><FaRegTrashAlt size={20} /></td>
                        </tr>))}
                </tbody>
            </table>
            <div className="pagenation">
                <FaArrowCircleLeft size="24" />
                {
                    pageNumbers.map((pageNum, index) => (
                        <span key={index}
                            className="numberItem"
                            onClick={() => setPage({ ...page, currentPage: pageNum })}
                        >
                            {pageNum}
                        </span>
                    ))
                }
                <FaArrowCircleRight size="24" />
            </div>
        </div>
    );
}

export default AdminNotice;