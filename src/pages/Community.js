import { useEffect, useState, useRef } from 'react';
import { API } from '../util/api';
import { FaPlus, FaHashtag, FaSearch } from "react-icons/fa";
import axios from 'axios';
import Modal from 'react-modal';
import ChatRoomItem from '../components/ChatRoomItem';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import ModalNewPopUp from '../components/ModalNewPopUp';
import ModalAskLogin from '../components/ModalAskLogin';
import ModalAskPw from '../components/ModalAskPw';
import { useContext } from "react";
import { NickNameContext } from "../App";

const Container = styled.div`
    height: 100vh;
`;

const Community = () => {

    const token = sessionStorage.getItem('jwtToken');

    const [chatList, setChatList] = useState([]);
    const [myRoomList, setMyRoomList] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    const searchTag = useState(false);

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({ "nickname": "", "email": "" });

    useEffect(() => {
        if (token) {
            postToken();
        }
    }, [token])

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

    const checkPw = async () => {
        try {
            let res = await fetch(`${API}/pwdcheck`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userInfo })
            }).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        goInRoom();
                    } else if (res.statusCode == 203) {

                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const goInRoom = async () => {
        try {
            const res = await fetch(`${API}/room`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            }).then((res) => res.json())
                .then((res) => console.log(res))
        } catch (e) {
            console.log(e);
        }
    }

    const checkRoomEnter = async (rum) => {
        try {
            // 
            let res = await fetch(`${API}/room`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo)
            }).then((res) => res.json())
                .then(res => {
                    console.log(res);
                    if (res.statusCode == 200) {
                        window.location.href = `/yogimoyo/room/${rum}`;
                    } else if (res.statusCode == 205) {
                        alert("정원초과로 입장할 수 없습니다. 다른 방을 검색해보세요!");
                    } else if (res.statusCode === 206) {

                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <ModalNewPopUp nickname={userInfo.nickname} user={userInfo} showModal={modalOpen} setShowModal={setModalOpen} />

            <div className='Community'>

                <Container>

                    <div className='search' ref={searchTag}>
                        <div className='title'>요기 모여요</div>
                        <div className='community-info'>
                            <p>{userInfo.nickname}님 안녕하세요 💙</p>
                            <p>이곳은 요기담아요의 커뮤니티 요기모여요 입니다.</p>
                            <p>요기모여요에서 다양한 커뮤니티 활동을 즐겨보세요!</p>
                        </div>
                        <div className='tag' onClick={() => setModalOpen(true)} style={{ "color": "#6D8DB6", "width": "20rem", "margin": "0 auto", "border": "1px solid #6D8DB6", "cursor": "pointer" }}><span><FaPlus style={{ "marginTop": "5px" }} /> 내 방 만들기</span> </div>
                        <div style={{ "padding": "10px" }}></div>
                        <div className='tag' onClick={() => navigate('/yogimoyo/search')} style={{ "color": "#689f38", "width": "20rem", "margin": "0 auto", "border": "1px solid #689f38", "cursor": "pointer" }}><span><FaSearch style={{ "marginTop": "5px" }} /> 이름/태그로 방 검색하기</span> </div>

                        <div style={{ "marginTop": "50px", "marginBottom": "60px" }}><strong>내 방 목록</strong></div>

                        <div className='my-room-list' style={{ "marginTop": "20px" }}>
                            {myRoomList.length == 0 ?
                                <div>아직 참여한 방이 없어요! <br />관심있는 주제로 검색하거나 새로운 방을 만들어서 <br /> 커뮤니티에 참여해보세요!</div>
                                :
                                <div className='chat-room-items-wrap'>
                                    {myRoomList.map((item) =>
                                        <ChatRoomItem userInfo={userInfo} key={item.rum} data={item} />)}
                                </div>
                            }
                        </div>
                    </div>

                    <div className='roomList'>
                        {chatList.map((item) => <ChatRoomItem userInfo={userInfo} onClick={() => checkRoomEnter(item.rum)} key={item.rum} data={item} />)}
                    </div>


                </Container>

            </div>
        </>
    );
}

export default Community;