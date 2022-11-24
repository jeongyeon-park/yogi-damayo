import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../util/api';
import ModalAskPw from './ModalAskPw';

import { NickNameContext } from "../App";
import ModalAskLogin from './ModalAskLogin';

import { FaLock, FaHashtag } from 'react-icons/fa';

const ChatRoomItem = ({ userInfo, data }) => {
    const imgUrlNum = Math.floor(Math.random() * (6 - 1)) + 1;
    const imgUrl = `/img/chat_room_logo/${imgUrlNum}.jpg`;

    const rum = data.rum;
    const [info, setInfo] = useState(data);

    const nickname = userInfo.nickname;

    const navigate = useNavigate();

    const [pwModal, setPwModal] = useState(false);
    const [askModal, setAskModal] = useState(false);



    const checkValues = () => {
        if (rum && nickname) {
            checkRoomEnter();
        }
    }

    // 내가 이미 들어가 있는지 확인 
    const checkRoomEnter = async () => {
        try {
            let res = await fetch(`${API}/room`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 'rum': rum, 'nickname': nickname })
            }).then((res) => res.json())
                .then(res => {
                    console.log(res);
                    if (res.statusCode == 200) {
                        window.location.href = `/yogimoyo/room/${rum}`;
                    } else if (res.statusCode == 205) {
                        alert("정원초과로 입장할 수 없습니다. 다른 방을 검색해보세요!");
                    } else if (res.statusCode === 206) {
                        console.log(res);
                        checkPw();
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    // 비밀번호 있 없 여부 체크    
    const checkPw = async () => {
        try {
            let res = await fetch(`${API}/entrance/${rum}`
            ).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        if (res.data['rm_type'] == 1) {
                            setPwModal(() => !pwModal);
                        } else {
                            setAskModal(() => !askModal);
                        }
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    return (

        <div className='room-item-wrap' style={{ "cursor": "pointer" }}>
            <ModalAskPw rum={rum} user={nickname} showModal={pwModal} setShowModal={setPwModal} />
            <ModalAskLogin rum={rum} title={info['title']} user={nickname} showModal={askModal} setShowModal={setAskModal} />
            <div onClick={checkValues} className='RoomItem' style={{ "border": "1px solid #ececec", "borderRadius": "5px", "width": "20rem", "padding": "20px" }}>
                <img src={imgUrl} alt="img" style={{ "width": "100%" }} />
                <div>{info['rm_type'] == 1 ? <FaLock style={{ "marginRight": "5px" }} /> : null}<strong>{info['title']}</strong></div>
                <div>{info['count']}명 / {info['maxnum']}명</div>
                <div style={{ "display": "flex", "justifyContent": "center", "marginTop": "10px", "flexWrap": "wrap" }}>
                    {info['tags'].length && info['tags'][0] != "" ? info['tags'].map((tag) => <div className='tag'><FaHashtag />{tag}</div>) : null}
                </div>

            </div>
        </div>

    );
}

export default React.memo(ChatRoomItem);

