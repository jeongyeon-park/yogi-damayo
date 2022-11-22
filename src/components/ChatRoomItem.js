import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../util/api';

const ChatRoomItem = ({ data }) => {

    const [info, setInfo] = useState(data);
    const navigate = useNavigate();
    const nickname = useContext()

    const checkRoomType = async () => {
        const res = await fetch(`${API}/entrance/${data.rum}`
        ).then((res) => res.json()
        ).then((res) => {
            if (res.data.rm_type === 0) {
                //goInRoom()
                // 방 입장하시겠습니까? 팝업
                // 입장 후 방 들어간 방 화면 링크
            }
            else if (res.data.rm_type === 1) {
                // 비밀번호 입력 팝업 
                // 맞았/ 틀렷
                // 맞았으면 방에 들어가는 링크 
            }

        });
    }



    return (

        <div className='RoomItem' onClick={() => navigate(`/yogimoyo/room/${info['rum']}`)} style={{ "border": "1px solid grey", "borderRadius": "5px", "width": "20rem", "padding": "20px" }}>
            <img src="/img/yogi_damayo_logo/AdminLogin.jpg" alt="image" style={{ "width": "100%" }} />
            <div><strong>{info['title']}</strong></div>
            <div>{info['count']}명 / {info['maxnum']}명</div>
            {/* {info['tags'].length ? info['tags'].map((tag) => <div>#{tag}</div>) : null} */}
        </div>
    );
}

export default ChatRoomItem;

