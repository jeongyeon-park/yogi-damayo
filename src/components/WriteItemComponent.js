
import { API } from '../util/api';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'

import ModalImgPopup from './ModalImgPopup';
import DeleteImgItem from './DeleteImgItem';

const WriteItemComponent = ({ item, nickname }) => {
    const [imgModal, setImgModal] = useState(false);
    const [data, setData] = useState({
        files: null,
        images: null,
        pseq: item.pseq,
        rum: item.rum,
        nickname: nickname,
        content: item.content
    });
    const [isEdit, setIsEdit] = useState(false);
    const [content, setContent] = useState(item.content);

    const [newImage, setNewImage] = useState([]);
    const [deleteNames, setDeleteNames] = useState([]);


    const toggleModify = () => {
        setIsEdit(() => !isEdit)

    }

    const onModify = () => {
        if (data.pseq && data.rum && data.nickname && data.content) {

            let formData = new FormData();

            let formFiles = data.files ? data.files : '';
            let formImages = deleteNames ? deleteNames : '';


            if (formFiles) {
                for (let i = 0; i < formFiles.length; i += 1) {
                    formData.append("files", formFiles[i]);
                }
            } else {
                formData.append("files", formFiles);
            }

            if (formImages) {
                for (let i = 0; i < formImages.length; i += 1) {
                    formData.append("images", formImages[i]);
                }
            } else {
                formData.append("images", formImages);
            }

            formData.append("pseq", data.pseq);
            formData.append("rum", data.rum);
            formData.append("nickname", data.nickname);
            formData.append("content", data.content);

            postModify(formData);
            console.log(formData);
        } else {
            console.log(data);
        }
    }


    const dataChangeHandler = (e) => {
        setContent(e.target.value);
        setData((prev) => { return { ...prev, content: e.target.value } });
    }

    const postModify = async (formData) => {
        try {
            let res = await fetch(`${API}/modification`, {
                method: "post",
                body: formData
            }).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        alert("???????????? ?????????????????????.");
                        window.location.href = `/yogimoyo/room/${item.rum}`;
                    } else {
                        alert("????????? ??????????????????. ?????? ?????? ????????????");
                        window.location.href = `/yogimoyo/room/${item.rum}`;
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const deletePost = async () => {
        try {
            let res = await fetch(`${API}/post/${item.pseq}`, {
                method: "delete"
            }).then(res => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        alert("???????????? ?????????????????????.");
                        window.location.href = `/yogimoyo/room/${item.rum}`;
                        console.log(res);
                    } else {
                        console.log(res);
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    const addImage = e => {

        const nowSelectImageList = Object.values(e.target.files).filter(item => item.size / 1024 / 1024 <= 5);
        console.log(typeof nowSelectImageList);
        if (nowSelectImageList.length != Object.values(e.target.files).length) {
            alert("???????????? 5mb??? ???????????? ????????????. 5mb??? ?????? ???????????? ???????????? ???????????????. ")
        }
        //const items = nowSelectImageList.filter(item => item.size / 1024 / 1024 <= 5);
        console.log(nowSelectImageList);
        //setNewFileList(()=>Object.values(nowSelectImageList));

        setData((prev) => { return { ...prev, files: [...nowSelectImageList] } })

        const nowImageURLList = [];
        for (let i = 0; i < nowSelectImageList.length; i += 1) {
            const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
            nowImageURLList.push(nowImageUrl);
        }

        setNewImage(nowImageURLList);
    }

    const toggleDeleteImg = (name) => {
        let slicedName = name.slice(8);
        if (deleteNames.includes(slicedName)) {
            setDeleteNames((prev) => prev.filter((item) => item != slicedName));
        } else {
            setDeleteNames(() => [...deleteNames, slicedName]);
        }
        console.log(deleteNames);
    }

    return (
        <>
            {/* <ModalImgPopup files={item.imageList} showModal={imgModal} setShowModal={setImgModal} /> */}
            <div className="WriteItemComponent">
                <div className="top-wrap">
                    <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between" }}>
                        <div style={{ "display": "flex", "alignItems": "center" }}>
                            <img src="/img/yogi_damayo_logo/yogi.jpg" alt="profile" style={{ "width": "50px", "borderRadius": "20px" }} />
                            <strong>{item.nickname}</strong>
                        </div>

                        <span>{item.reg_date.slice(0, 10)}</span>
                    </div>


                </div>
                <div className="mid-wrap" style={{ "margin": "20px 0px", }}>
                    {
                        isEdit ? <textarea value={content} onChange={dataChangeHandler} style={{ "width": "100%", "resize": "none" }} /> :
                            item.content
                    }
                </div>
                <div className="bottom-wrap" style={{ "display": "flex" }}>
                    {!isEdit ? item.imageList.map((url) => <img onClick={() => setImgModal(() => !imgModal)} key={url.image_name} src={url.image_name} alt="img" style={{ "width": "80px", "height": "100px" }} />)
                        : null
                    }

                </div>
                {isEdit ?
                    <div className='delete-img-wrap'>
                        <div>?????? ?????????</div>
                        <div>?????????????????? ???????????? ?????? ????????????.</div>
                        <div style={{ "display": "flex", "justifyContent": "start" }}>
                            {item.imageList.map((url) =>
                                <DeleteImgItem url={url.image_name} toggleDeleteImg={toggleDeleteImg} />

                            )}
                        </div>

                    </div>

                    : null}

                {isEdit ?
                    <div className='new-img-wrap'>
                        <div style={{ "margin": "10px 0" }}>????????? ?????????</div>
                        <div className='new-image-list'>
                            {newImage.length ? newImage.map((item) => <img src={item} alt='img' style={{ "width": "100px", "height": "100px" }} />)
                                : null}
                        </div>
                        <div style={{ "margin": "10px 0" }}>????????? ?????? ??????, ?????????????????? ?????? ????????? ??????, ?????? ???????????? ?????? ???????????? ?????? ??? ??? ???????????? ??? ?????????.</div>
                    </div>

                    : null}

                {nickname == item.nickname ?
                    (
                        <div className='btns' style={{ "display": "flex", "justifyContent": "right" }}>
                            {
                                isEdit ?
                                    <>
                                        <label htmlFor="new-file-upload" className='submit-btn-style'>????????? ????????????</label>
                                        <input id="new-file-upload" type="file" accept="image/*" onChange={addImage} multiple />
                                        <button onClick={onModify} className="submit-btn-style" style={{ "marginLeft": "10px" }}>????????????</button>
                                        <button onClick={() => toggleModify(() => !isEdit)} className="delete-btn-style" style={{ "marginLeft": "10px" }} >????????????</button>
                                    </>
                                    :
                                    <><button onClick={toggleModify} className="submit-btn-style">????????????</button>
                                        <button onClick={deletePost} style={{ "marginLeft": "10px" }} className="delete-btn-style">????????????</button></>

                            }
                        </div>
                    ) : null}

            </div>
        </>

    );
}

export default WriteItemComponent;