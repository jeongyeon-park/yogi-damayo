import { useEffect, useState, useRef } from 'react';
import { API } from '../util/api';
import { FaPlus, FaHashtag, FaSearch } from "react-icons/fa";
import axios from 'axios';
import Modal from 'react-modal';
import ChatRoomItem from '../components/ChatRoomItem';
import { useNavigate } from 'react-router-dom';

const NewRoomPopup = ({ nickname }) => {

    const [data, setData] = useState({
        "nickname": nickname,
        "title": "",
        "rm_type": 0,
        "maxnum": 2,
        "tags": []
    });
    const [password, setPassword] = useState();

    const [tagList, setTagList] = useState([]);

    const changeData = (e) => {
        if (e.target.name == "rm_type" && data.rm_type == 1) {
            setData({ ...data, [e.target.name]: 0 });
        } else {
            setData({ ...data, [e.target.name]: e.target.value })
        }
    }


    return (
        <div className='NewRoomPopup' style={{ "textAlign": "center" }}>
            <div>새로운 방 생성하기</div>
            <div>새로운 방을 생성하기 위해 아래 양식을 작성 해주세요.</div>
            <div>"비밀방" 을 체크하면 비밀번호를 설정해서 비밀방을 만들 수 있어요!</div>
            <div><span>방 제목</span><input name='title' onChange={changeData} /></div>
            <div>인원수 <input type="number" min={2} max={100} /></div>
            <div>태그 <input name='tag' /></div>
            <div className='tag-list'>
                {tagList.map((item) => <span>#{item}</span>)}
            </div>
            <label>
                <input type="checkbox" name="rm_type" value="1" onChange={changeData} /> 비밀방으로 방 생성하기
            </label>

            {
                data.rm_type == 1 ?
                    <div ><input className='password' name="password" onChange={changeData} /> </div>
                    : null
            }

            <button onClick={() => console.log(data)}> 방 생성하기</button>
        </div>
    )
}

const Community = () => {

    const token = sessionStorage.getItem('jwtToken');
    const [userInfo, setUserInfo] = useState({ "nickname": "", "email": "" });
    const [search, setSearch] = useState("");
    const [chatList, setChatList] = useState([]);
    const [myRoomList, setMyRoomList] = useState([]);
    const [msg, setMsg] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const searchTag = useState(false);

    const resultTag = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        postToken();
    }, []);
    useEffect(() => {
        if (userInfo.nickname.length) {
            getMyRooms();
        }
    }, [userInfo]);

    const postToken = async () => {
        try {
            let res = await fetch(`${API}/user/token`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token })
            }).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        setUserInfo(res.data);
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    const getMyRooms = async () => {
        try {
            const res = await fetch(`${API}/room/${userInfo.nickname}`
            ).then((res) => res.json()
            ).then(res => {
                if (res.statusCode == 200) {
                    setMyRoomList(res.data);
                    console.log(res.data);
                }
            }
            );
        } catch (e) {
            console.log(e);
        }
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const clickSearch = () => {
        if (search.length) {
            getSearchChat();
        }
    }

    const getSearchChat = async () => {
        try {
            const res = await fetch(`${API}/searchroom?keyword=${search}`
            ).then((res) => res.json()
            ).then(res => {
                if (res.statusCode == 200) {
                    setChatList(res.data);
                    setMsg("");
                    this.searchTag.classList.add('hide');
                }
                else if (res.statusCode == 203) {
                    setMsg(() => res.data)
                }
            }
            );

        } catch (e) {
            console.log(e);
        }
    }



    return (
        <div className='Community'>

            <div className='search' ref={searchTag}>
                <div className='title'>요기 모여요</div>
                <div className='community-info'>
                    <p>{userInfo.nickname}님 안녕하세요 💙</p>
                    <p>이곳은 요기담아요의 커뮤니티 요기모여요 입니다.</p>
                    <p>요기모여요에서 다양한 커뮤니티 활동을 즐겨보세요!</p>
                </div>
                <div className='tag' onClick={() => setModalOpen(true)} style={{ "color": "#6D8DB6", "width": "20rem", "margin": "0 auto", "border": "1px solid #6D8DB6" }}><span><FaPlus style={{ "marginTop": "5px" }} /> 내 방 만들기</span> </div>
                <div className='tag' onClick={() => navigate('/yogimoyo/search')} style={{ "color": "#689f38", "width": "20rem", "margin": "0 auto", "border": "1px solid #689f38" }}><span><FaSearch style={{ "marginTop": "5px" }} /> 이름/태그로 방 검색하기</span> </div>

                <div className='tag-list'>
                    <div className='tag'><span><FaHashtag style={{ "marginTop": "5px" }} />동작구</span></div>
                    <div className='tag'><span><FaHashtag style={{ "marginTop": "5px" }} />쓰레기_분리수거</span></div>
                    <div className='tag'><span><FaHashtag style={{ "marginTop": "5px" }} />페트병</span></div>
                </div>
                <div className='my-room-list' style={{ "marginTop": "20px" }}>
                    <div style={{ "marginBottom": "20px" }}><strong>내 방 목록</strong></div>
                    {myRoomList.length == 0 ?
                        <div>아직 참여한 방이 없어요! <br />관심있는 주제로 검색하거나 새로운 방을 만들어서 <br /> 커뮤니티에 참여해보세요!</div>
                        :
                        <div></div>}
                </div>

                <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} size="sm">
                    <NewRoomPopup nickname={userInfo.nickname} />
                    <button onClick={() => setModalOpen(false)}>취소</button>
                </Modal>

            </div>

            <div className='roomList' ref={resultTag}>
                {chatList.map((item, idx) => <ChatRoomItem key={idx} data={item} />)}
            </div>

        </div>
    );
}

export default Community;