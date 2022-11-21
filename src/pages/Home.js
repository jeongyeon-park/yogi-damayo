import { API } from '../util/api';
import { FaSearch, FaCamera } from 'react-icons/fa'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchResultComponent from "../components/SearchResultComponent";

import GetUserInfo from '../components/GetUserInfo';

const Home = () => {
    const [file, setFile] = useState();

    const [imgSrc, setImgSrc] = useState(null);
    const form = new FormData();
    const [formData, setFormData] = useState(form);
    const [keyword, setKeyword] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [msg, setMsg] = useState(false);

    const navigate = useNavigate();

    const postData = async (data) => {
        try {
            const res = await fetch("http://119.209.77.170:5000/upload", {
                method: "post",
                body: data
            }
            ).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        navigate(`/info/${res.data.name}`);
                    } else if (res.statusCode == 204) {
                        setMsg(true);
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    const fileChangeHandler = (e) => {
        setMsg(false);
        const file = e.target.files[0];
        setFile(file);
    }

    const searchHandler = () => {
        const formData = new FormData();
        formData.append("file", file);
        // console.log(formData);
        postData(formData);
        // console.log(formData.get("file"));
    }

    const keywordChangeHandler = (e) => {
        setKeyword(e.target.value);
    }

    useEffect(() => {
        let fileReader = new FileReader();
        if (file) {
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImgSrc(result);
                    console.log(result);
                }
            }
            fileReader.readAsDataURL(file);
        }
    }, [file])

    const getSearchResult = async () => {
        try {
            const res = await fetch(`${API}/search?data=${keyword}`
            ).then((res) => res.json());

            if (res.statusCode == 200) {
                console.log(res);
                setSearchResult(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (keyword) getSearchResult()
        }, 200)
        return () => {
            clearTimeout(debounce)
        }
    }, [keyword])

    return (
        <div className='Home'>
            <div className='info-wrap'>
                <div className='info'>
                    <div className='main-info'>어디에 버리는 게 좋을까요? 🤔</div>
                    <div className='sub-info'>당신의 재활용을 도와드릴게요.</div>
                    <div className='sub-info'>재활용 방법이 궁금한 쓰레기의 이름을 입력하거나 사진을 찍어 검색해 보세요.</div>

                    <div className='input-tag'>
                        <input className='input-info' onChange={keywordChangeHandler} placeholder="예) 콜라 라고 검색해 보세요! " />
                        <FaSearch className="icons search-svg" size={22} />

                        <label htmlFor="file-upload" className="custom-file-upload"><FaCamera className="icons" size={25} /></label>
                        <input id="file-upload" type="file" accept="image/*" onChange={fileChangeHandler} />
                    </div>

                    <div className="search-result" style={{ "display": "flex", "justifyContent": "center" }} >
                        {(keyword.length ? searchResult.map((item, idx) => (<SearchResultComponent key={idx} no={item.no} type={item.type} name={item.d_name} img={item.d_image} />)) : null)}
                    </div>


                </div>
            </div>
            {
                imgSrc ?
                    <div className="img-preview-wrapper">
                        {
                            <>
                                <div className="btn-list">
                                    {msg ? <div>분류할 수 없는 이미지입니다. <br /> 다시 촬영 해주세요.</div> : null}
                                    <img src={imgSrc} alt="preview" className="preview-img" />
                                    <div className="btn-search">
                                        <button onClick={searchHandler}>
                                            이 이미지로 검색하기
                                        </button>
                                    </div>

                                    <button className="btn-new-img">
                                        <label htmlFor="file-upload" className="custom-file-upload">다른 이미지로 검색하기</label>
                                        <input id="file-upload" type="file" accept="image/*" onChange={fileChangeHandler} />
                                    </button>

                                </div>

                            </>
                        }
                    </div>
                    : null
            }
        </div >
    );
}

export default Home;