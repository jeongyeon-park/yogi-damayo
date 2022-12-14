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
                        alert("??????????????? ????????? ??? ????????????. ?????? ?????? ??????????????????!");
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
                        <div className='title'>?????? ?????????</div>
                        <div className='community-info'>
                            <p>{userInfo.nickname}??? ??????????????? ????</p>
                            <p>????????? ?????????????????? ???????????? ??????????????? ?????????.</p>
                            <p>????????????????????? ????????? ???????????? ????????? ???????????????!</p>
                        </div>
                        <div className='tag' onClick={() => setModalOpen(true)} style={{ "color": "#6D8DB6", "width": "20rem", "margin": "0 auto", "border": "1px solid #6D8DB6", "cursor": "pointer" }}><span><FaPlus style={{ "marginTop": "5px" }} /> ??? ??? ?????????</span> </div>
                        <div style={{ "padding": "10px" }}></div>
                        <div className='tag' onClick={() => navigate('/yogimoyo/search')} style={{ "color": "#689f38", "width": "20rem", "margin": "0 auto", "border": "1px solid #689f38", "cursor": "pointer" }}><span><FaSearch style={{ "marginTop": "5px" }} /> ??????/????????? ??? ????????????</span> </div>

                        <div style={{ "marginTop": "50px", "marginBottom": "60px" }}><strong>??? ??? ??????</strong></div>

                        <div className='my-room-list' style={{ "marginTop": "20px" }}>
                            {myRoomList.length == 0 ?
                                <div>?????? ????????? ?????? ?????????! <br />???????????? ????????? ??????????????? ????????? ?????? ???????????? <br /> ??????????????? ??????????????????!</div>
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