import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from '../util/api';
import { FaImages } from 'react-icons/fa'
import WriteItemComponent from "../components/WriteItemComponent";

const Room = () => {
    const { rum } = useParams();
    const [msgList, setMsgList] = useState([]);

    useEffect(() => {
        getRoomMsg();
    }, [])

    const getRoomMsg = async () => {
        const res = await fetch(`${API}/post/${rum}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setMsgList(res.data);
            });
    }

    return (
        <div className="Room">
            <div className="write-wrap" style={{ "marginBottom": "40px" }}>
                <div className="WriteItemComponent">
                    <div className="top-wrap" style={{ "display": "flex", "justifyContent": "start", "alignItems": "center" }}>
                        <img src="/img/yogi_damayo_logo/yogi.jpg" alt="profile" style={{ "width": "50px", "borderRadius": "20px" }} />
                        <strong>닉네임</strong>
                    </div>
                    <div className="mid-wrap">
                        <textarea style={{ "width": "100%", "height": "50px", "margin": "20px 0", "padding": "10px" }} />
                    </div>
                    <div className="bottom-wrap" style={{ "display": "flex", "justifyContent": "space-between" }}>
                        <FaImages size={20} />
                        <button>작성하기</button>
                    </div>
                </div>
            </div>


            <div className="msg-list-wrap">
                {msgList.length != 0 ? msgList.map((item) =>
                    <WriteItemComponent key={item.pseq} item={item} />
                ) : <div>게시글이 없네요. 첫번째 게시글을 작성 해보세요.</div>}
            </div>
        </div>
    );
}

export default Room;