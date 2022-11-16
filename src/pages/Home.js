import Header from "../components/Header";
import Notice from "./Notice";

import mainLogo from '../util/main-image.jpg';
import mainImg from '../util/main-image-2.jpg';

import { IMAGE_API } from '../util/api';
import { API } from '../util/api';
import { FaSearch, FaCamera } from 'react-icons/fa'

import { useEffect, useState } from "react";
import { infoTag } from "../util/img_text"
import { useNavigate } from "react-router-dom";
import SearchResultComponent from "../components/SearchResultComponent";

const Home = () => {
    const [file, setFile] = useState();

    const [imgSrc, setImgSrc] = useState(null);
    const form = new FormData();
    const [formData, setFormData] = useState(form);
    const [keyword, setKeyword] = useState();
    const [searchResult, setSearchResult] = useState([]);

    const navigate = useNavigate();

    const postData = async (data) => {
        try {
            const res = await fetch('/api/upload', {
                method: "post",
                body: data
            }
            ).then((res) => res.json())
                .then(res => {
                    if (res.statusCode == 200) {
                        navigate(`/info/${res.data.name}`);
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    const fileChangeHandler = (e) => {
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
                    <div className='sub-info'></div>
                    <input className='input-info' onChange={keywordChangeHandler} placeholder="예) 콜라 라고 검색해 보세요! " />
                    <FaSearch className="icons" size={22} />


                    <label htmlFor="file-upload" className="custom-file-upload"><FaCamera className="icons" size={25} /></label>
                    <input id="file-upload" type="file" accept="image/*" onChange={fileChangeHandler} />
                    <div className="search-result">
                        {searchResult.map((item, idx) => (<SearchResultComponent key={idx} type={item.type} name={item.d_name} img={item.d_image} />))}
                    </div>


                </div>
                <div className='image'>
                    {/* <img src={mainLogo} alt="mainImage" className="main-image" /> */}
                </div>
            </div>
            {imgSrc ?
                <div className="img-preview-wrapper">
                    {
                        <>
                            <img src={imgSrc} alt="preview" className="preview-img" />

                            <div className="btn-list">
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