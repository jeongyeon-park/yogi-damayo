
import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { API } from '../util/api';


const AdminMain = () => {

    const [adminList, setAdminList] = useState([]);

    useEffect(() => {
        getAdminList();
    }, [])

    const getAdminList = async () => {
        let res = await fetch(`${API}/admin`)
            .then(
                (res) => res.json())
            .then((res) => {
                setAdminList(res.data);
                console.log(res.data);
            })
    }

    return (
        <div className="AdminMain admin">
            <AdminHeader />
            <div className="adminList">
                <div>관리자 멤버 리스트</div>
                {adminList.length ? adminList.map((item) => (
                    <div className="adminInfo" style={{ "display": "flex", "padding": "10px 20px", "borderBottom": "1px solid #ececec" }}>
                        <div>
                            <div><strong>{item.name}</strong></div>
                            <div>{item.email}</div>
                        </div>
                        <div>{item.position}</div>
                        <div>{item.authority ? "마스터" : "관리자"}계정</div>
                    </div>))
                    : null}
            </div>
        </div>
    )
}

export default AdminMain;