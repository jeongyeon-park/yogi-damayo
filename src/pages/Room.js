import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from '../util/api';
import { FaImages } from 'react-icons/fa'
import WriteItemComponent from "../components/WriteItemComponent";
import { useNavigate } from 'react-router-dom';

const Room = () => {
    const token = sessionStorage.getItem('jwtToken');
    const [nickname, setNickname] = useState("");
    const { rum } = useParams();
    const [msgList, setMsgList] = useState([]);
    const [title, setTitle] = useState([]);
    const [data, setData] = useState({
        "files": [],
        "rum": rum,
        "nickname": "",
        "content": ""
    });

    const [myImage, setMyImage] = useState([]);

    useEffect(() => {
        postToken();
        getRoomMsg();

    }, [])

    const getRoomMsg = async () => {
        const res = await fetch(`${API}/post/${rum}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.statusCode == 200) {
                    setMsgList(() => res.data.content);
                    setTitle(() => res.data.title);
                } else {
                    setMsgList([]);
                }
            });
    }

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
                        setNickname(res.data.nickname);
                        setData((prev) => { return { ...prev, nickname: res.data.nickname } });
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file.size / 1024 / 1024 > 5) {
            alert("파일크기는 5MB 를 초과할 수 없습니다. 다른 이미지를 선택 해주세요.");
            e.target.value = null;
        } else {
            setData((prev) => { return { ...prev, files: file } })
        }
    }

    const addImage = e => {

        const nowSelectImageList = e.target.files;
        //const items = nowSelectImageList.filter(item => item.size / 1024 / 1024 <= 5);
        console.log(typeof (nowSelectImageList));
        setData((prev) => { return { ...prev, files: nowSelectImageList } })

        const nowImageURLList = [...myImage];
        for (let i = 0; i < nowSelectImageList.length; i += 1) {
            const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
            nowImageURLList.push(nowImageUrl);
        }
        setMyImage(nowImageURLList);

    }

    const dataChangeHandler = (e) => {
        setData((prev) => { return { ...prev, content: e.target.value } })
    }

    const submitHandler = () => {
        if (data.rum && data.nickname && data.content.length) {
            let formData = new FormData();
            for (let i = 0; i < data.files.length; i += 1) {
                formData.append("files", data.files[i]);
            }

            formData.append("rum", data.rum);
            formData.append("nickname", data.nickname);
            formData.append("content", data.content);
            postNewData(formData);
        } else {
            console.log('파라미터부족');
            console.log(data);
        }
    }

    const postNewData = async (formData) => {
        try {
            let res = await fetch(`${API}/postinsert`, {
                method: "post",
                body: formData
            }).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        window.location.href = `/yogimoyo/room/${rum}`;
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="Room">
            <div style={{ "textAlign": "center" }}>{title}</div>
            <div className="write-wrap" style={{ "marginBottom": "40px" }}>
                <div className="WriteItemComponent">
                    <div className="top-wrap" style={{ "display": "flex", "justifyContent": "start", "alignItems": "center" }}>
                        <img src="/img/yogi_damayo_logo/yogi.jpg" alt="profile" style={{ "width": "50px", "borderRadius": "20px" }} />
                        <strong>{nickname}</strong>
                    </div>
                    <div className="mid-wrap">
                        <textarea name="content" onChange={dataChangeHandler} style={{ "width": "100%", "height": "50px", "margin": "20px 0", "padding": "10px", "resize": "none" }} />
                    </div>
                    <div className='imgs'>
                        {myImage.length ? myImage.map((item) => <img src={item} alt='img' style={{ "width": "100px", "height": "100px" }} />)
                            : null}
                    </div>
                    <div className="bottom-wrap" style={{ "display": "flex", "justifyContent": "space-between" }}>

                        <label htmlFor="file-upload" className="custom-file-upload"><FaImages size={20} className="icons" /></label>
                        <input id="file-upload" type="file" accept="image/*" onChange={addImage} multiple />
                        <button onClick={submitHandler}>작성하기</button>
                    </div>
                </div>
            </div>


            <div className="msg-list-wrap">
                {msgList.length === 0 ?
                    <div>게시글이 없네요. 첫번째 게시글을 작성 해보세요.</div> :
                    msgList.map((item) =>
                        <WriteItemComponent key={item.pseq} item={item} nickname={nickname} />
                    )
                }
            </div>
        </div>
    );
}

export default Room;