import { API } from '../util/api';
import { FaSearch, FaCamera } from 'react-icons/fa'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchResultComponent from "../components/SearchResultComponent";

import GetUserInfo from '../components/GetUserInfo';

import AdminNotice from '../pages/AdminNotice';

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
                    <div className='main-info'>????????? ????????? ??? ????????????? ????</div>
                    <div className='sub-info'>????????? ???????????? ??????????????????.</div>
                    <div className='sub-info'>????????? ????????? ????????? ???????????? ????????? ??????????????? ????????? ?????? ????????? ?????????.</div>

                    <div className='input-tag'>
                        <input className='input-info' onChange={keywordChangeHandler} placeholder="???) ?????? ?????? ????????? ?????????! " />
                        <FaSearch className="icons search-svg" size={22} />

                        <label htmlFor="file-upload" className="custom-file-upload"><FaCamera className="icons" size={25} /></label>
                        <input id="file-upload" type="file" accept="image/*" onChange={fileChangeHandler} />
                    </div>

                    <div className="search-result" >
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
                                    {msg ? <div>????????? ??? ?????? ??????????????????. <br /> ?????? ?????? ????????????.</div> : null}
                                    <img src={imgSrc} alt="preview" className="preview-img" />
                                    <div className="btn-search">
                                        <button onClick={searchHandler}>
                                            ??? ???????????? ????????????
                                        </button>
                                    </div>


                                    <label htmlFor="file-upload" className="btn-new-img custom-file-upload">?????? ???????????? ????????????</label>

                                    <input id="file-upload" type="file" accept="image/*" onChange={fileChangeHandler} />

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