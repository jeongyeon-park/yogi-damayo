import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components'
import { FaWindowClose } from "react-icons/fa";
import { API } from '../util/api';
import { FaHashtag } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";


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

const ModalImgPopup = ({ files, showModal, setShowModal }) => {
    const modalRef = useRef();

    const navigate = useNavigate();

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <ModalWrapper showModal={showModal}>
                        <ModalContent>

                            <div >
                                <h2> Single Item</h2>
                                <Slider {...settings}>
                                    <div><h3>1</h3></div>
                                    <div><h3>2</h3></div>
                                    <div><img src='/img/chat_room_logo/2.jpg' /></div>
                                    {/* {files.map((item) => <div key={item.image_name}><img src={item.image_name} alt="preview" style={{ "width": "200px" }} /></div>)} */}
                                </Slider>
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

export default ModalImgPopup;