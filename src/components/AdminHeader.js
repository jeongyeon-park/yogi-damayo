import boardLogo from '../util/admin_menu_logo/게시판.png';
import memberLogo from '../util/admin_menu_logo/맴버.png';
import homeLogo from '../util/admin_menu_logo/메인 홈.png';
import askLogo from '../util/admin_menu_logo/문의사항.png';
import dBLogo from '../util/admin_menu_logo/이미지 디비.png';

const AdminHeader = () => {

    return (
        <div className="AdminHeader" style={{ "display": "flex", "backgroundColor": "black" }}>
            <ul>
                <li><img src={homeLogo} alt="Home" /></li>
                <li><img src={memberLogo} alt="Member" /></li>
                <li><img src={boardLogo} alt="Board" /></li>
                <li><img src={askLogo} alt="Ask" /></li>
            </ul>
        </div>
    );
}

export default AdminHeader;