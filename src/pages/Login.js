import { FaUserFriends, FaUserCog } from "react-icons/fa"

const Login = () => {
    return (
        <div className="Login">
            <div className="user">
                <FaUserFriends size={50} />
                <p>회원 로그인</p>
            </div>
            <div className="admin">
                <FaUserCog size={50} />
                <p>관리자 로그인</p>
            </div>
        </div>
    );
}

export default Login;