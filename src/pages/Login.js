import { FaUserFriends, FaUserCog } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    return (
        <div className="Login">
            <div className="user" onClick={() => navigate("/userLogin")}>
                <FaUserFriends size={50} />
                <p>회원 로그인</p>
            </div>
            <div className="admin" onClick={() => navigate("/adminLogin")}>
                <FaUserCog size={45} />
                <p>관리자 로그인</p>
            </div>
        </div>
    );
}

export default Login;