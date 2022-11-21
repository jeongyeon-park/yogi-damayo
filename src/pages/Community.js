import { useEffect, useState, useRef } from 'react';
import { API } from '../util/api';
import { FaPlus, FaHashtag, FaSearch } from "react-icons/fa";
import axios from 'axios';
import Modal from 'react-modal';
import ChatRoomItem from '../components/ChatRoomItem';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import ModalNewPopUp from '../components/ModalNewPopUp';

const Container = styled.div`
    height: 100vh;
`;

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
        <>
            <ModalNewPopUp nickname={userInfo.nickname} showModal={modalOpen} setShowModal={setModalOpen} />
            <div className='Community'>

                <Container>

                    <div className='search' ref={searchTag}>
                        <div className='title'>요기 모여요</div>
                        <div className='community-info'>
                            <p>{userInfo.nickname}님 안녕하세요 💙</p>
                            <p>이곳은 요기담아요의 커뮤니티 요기모여요 입니다.</p>
                            <p>요기모여요에서 다양한 커뮤니티 활동을 즐겨보세요!</p>
                        </div>
                        <div className='tag' onClick={() => setModalOpen(true)} style={{ "color": "#6D8DB6", "width": "20rem", "margin": "0 auto", "border": "1px solid #6D8DB6" }}><span><FaPlus style={{ "marginTop": "5px" }} /> 내 방 만들기</span> </div>
                        <div className='tag' onClick={() => navigate('/yogimoyo/search')} style={{ "color": "#689f38", "width": "20rem", "margin": "0 auto", "border": "1px solid #689f38" }}><span><FaSearch style={{ "marginTop": "5px" }} /> 이름/태그로 방 검색하기</span> </div>

                        <div className='my-room-list' style={{ "marginTop": "20px" }}>
                            <div style={{ "marginBottom": "20px" }}><strong>내 방 목록</strong></div>
                            {myRoomList.length == 0 ?
                                <div>아직 참여한 방이 없어요! <br />관심있는 주제로 검색하거나 새로운 방을 만들어서 <br /> 커뮤니티에 참여해보세요!</div>
                                :
                                myRoomList.map((item) => <div>
                                    <ChatRoomItem key={item.rum} data={item} />
                                </div>)}
                        </div>
                    </div>

                    <div className='roomList' ref={resultTag}>
                        {chatList.map((item, idx) => <ChatRoomItem key={idx} data={item} />)}
                    </div>


                </Container>

            </div>
        </>
    );
}

export default Community;