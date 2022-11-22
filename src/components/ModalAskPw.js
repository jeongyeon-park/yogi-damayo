import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components'
import { FaWindowClose } from "react-icons/fa";
import { API } from '../util/api';
import { FaLock } from 'react-icons/fa';
import { FaHashtag } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;
  left:0;
  top:0;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
    display:flex;
    align-items:center;
    justify-content:center;
  position: absolute;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(FaWindowClose)`
cursor: pointer;
position: absolute;
top: 20px;
right: 20px;
width: 32px;
height: 32px;
padding: 0;
z-index: 10;
`;


const ModalAskPw = ({ rum, user, showModal, setShowModal }) => {

    const navigate = useNavigate();

    const modalRef = useRef();
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(false);

    const changeHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitPw = () => {
        if (password && rum) {
            checkPw()
        }
    }

    const goInRoom = async () => {
        try {
            const res = await fetch(`${API}/room`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rum: rum, nickname: user })
            }).then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    navigate(`/yogimoyo/room/${rum}`);
                })
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
                body: JSON.stringify({ rum: rum, password: password })
            }).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        setMsg(false);
                        goInRoom();
                    } else if (res.statusCode == 203) {
                        setMsg(true);
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }



    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };
    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                console.log('I pressed');

            }
        },
        [setShowModal, showModal]
    );
    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);

        },
        [keyPress]
    );


    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <ModalWrapper showModal={showModal}>
                        <ModalContent>

                            <div className='ModalNewPopUp' style={{ "textAlign": "center" }}>
                                <FaLock />
                                <div><strong>방 제목</strong></div>
                                <div>이 방은 비밀방 입니다.</div>
                                <div>비밀번호가 필요합니다.</div>

                                <input onChange={changeHandler} />
                                {msg ? <div>잘못된 비밀번호입니다. 다시 입력 해 주세요.</div> : null}
                                <button onClick={submitPw}>입장하기</button>
                            </div>

                        </ModalContent>

                        <CloseModalButton
                            aria-label='Close modal'
                            onClick={() => setShowModal(prev => !prev)}
                        />
                    </ModalWrapper>
                </Background>
            ) : null}
        </>
    )
}

export default ModalAskPw;