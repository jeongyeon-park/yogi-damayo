import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components'
import { FaWindowClose } from "react-icons/fa";
import { API } from '../util/api';
import { FaHashtag, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

const ModalNewPopUp = ({ nickname, showModal, setShowModal }) => {
    const [data, setData] = useState({
        "nickname": nickname,
        "title": "",
        "password": null,
        "rm_type": 0,
        "maxnum": 0,
        "tags": []
    });

    const navigate = useNavigate();


    const [tagList, setTagList] = useState([]);
    const [msg, setMsg] = useState(false);

    const changeData = (e) => {
        if (e.target.name == "rm_type" && data.rm_type == 1) {
            setData({ ...data, [e.target.name]: 0 });
        } else {
            setData({ ...data, [e.target.name]: e.target.value })
        }
    }

    const changeTag = (value) => {
        setTagList((prev) => [...prev, value]);
    }

    useEffect(() => {
        setData((prev) => { return { ...prev, tags: tagList } })
    }, [tagList])


    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() && !tagList.includes(e.target.value)) {
            changeTag(e.target.value); // Enter ????????? ?????? ?????? ????????? ??????
            e.target.value = null;
        }
    }

    const checkData = () => {
        if (data.rm_type == 0 && data.nickname && data.title && data.maxnum > 1) {
            postNewRoom();
        } else if (data.rm_type == 1 && data.nickname && data.title && data.maxnum && data.password && data.maxnum > 1) {
            postNewRoom();
        } else {
            console.log(data);
            setMsg(true);
        }
    }

    const postNewRoom = async () => {
        try {
            let res = await fetch(`${API}/community`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((res) => res.json())
                .then((res) => {
                    if (res.statusCode == 200) {
                        setShowModal(false);
                        window.location.href = `/yogimoyo`;
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }


    const modalRef = useRef();
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
                setData({
                    "nickname": nickname,
                    "title": "",
                    "password": null,
                    "rm_type": 0,
                    "maxnum": 0,
                    "tags": []
                })
                setTagList([]);
                setMsg(false);
            }
        },
        [setShowModal, showModal]
    );
    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            setData({
                "nickname": nickname,
                "title": "",
                "password": null,
                "rm_type": 0,
                "maxnum": 0,
                "tags": []
            })
            setTagList([]);
            setMsg(false);
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
                                <div><strong>????????? ??? ????????????</strong></div>
                                <div>????????? ?????? ???????????? ?????? ?????? ????????? ?????? ????????????.</div>
                                <div>"?????????" ??? ???????????? ??????????????? ???????????? ???????????? ?????? ??? ?????????!</div>
                                <div style={{ "marginTop": "30px", "marginBottom": "40px" }}>

                                    <div className='form-wrap'>
                                        <div className='div-wrap'>
                                            <span>??? ??????</span>
                                            <input name='title' onChange={changeData} autocomplete="off" />
                                        </div>
                                        <div className='div-wrap'>
                                            <span>?????? ?????????</span>
                                            <input name='maxnum' type="number" min={2} max={100} onChange={changeData} autocomplete="off" />
                                        </div>
                                        <div className='div-wrap'>
                                            <span>??????</span>
                                            <input name='tag' onKeyPress={handleOnKeyPress} placeholder="???????????? ??? ????????? ???????????????." autocomplete="off" />
                                        </div>
                                    </div>

                                    <div className='tag-list'>
                                        {tagList.map((item) => <div className='tag'><FaHashtag />{item}<FaTimesCircle color='#ff8080' style={{ "marginLeft": "10px", "cursor": "pointer" }} onClick={() => { setTagList((prev) => prev.filter((ele) => ele != item)) }} /></div>)}
                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" name="rm_type" value="1" onChange={changeData} autocomplete="off" /> ??????????????? ??? ????????????
                                        </label>
                                    </div>
                                    {
                                        data.rm_type == 1 ?
                                            <div className='pw-input'><input className='password' name="password" onChange={changeData} placeholder="??????????????? ??????????????????." /> </div>
                                            : null
                                    }
                                </div>

                                {msg ? <div>?????? ?????? ?????? ????????????.</div> : null}
                                <button onClick={checkData}> ??? ????????????</button>
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

export default ModalNewPopUp;