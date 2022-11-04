import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const goNotice = () => {
        navigate("/notice");
    }

    const goHome = () => {
        navigate("/");
    }

    const goQuesiton = () => {
        navigate("/question");
    }

    return (
        <div className='Header'>
            <div onClick={goHome}>요기 담아요</div>
            <div className='sub-menu'>
                <div onClick={goNotice}>공지사항</div>
                <div >위치서비스</div>
                <div onClick={goQuesiton}>문의</div>
                <div>최근 검색</div>
            </div>
        </div>
    );
}

export default Header;