import Header from "../components/Header";
import Notice from "./Notice";

import mainLogo from '../util/main-image.jpg';
import mainImg from '../util/main-image-2.jpg';

import { IMAGE_API } from '../util/api';
import { FaSearch, FaCamera } from 'react-icons/fa'
import { useEffect, useState } from "react";

const Home = () => {
    const [file, setFile] = useState();

    const [imgSrc, setImgSrc] = useState(null);
    const form = new FormData();
    const [formData, setFormData] = useState(form);


    const changeHandler = (e) => {
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

    const postData = async (data) => {
        try {
            const res = await fetch('http://119.209.77.170:5001/upload', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
            ).then((res) => res.json());
        } catch (err) {
            console.log(err);
        }
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

    return (
        <div className='Home'>
            <div className='info-wrap'>
                <div className='info'>
                    <div className='main-info'>어디에 버리는 게 좋을까요? 🤔</div>
                    <div className='sub-info'>당신의 재활용을 도와드릴게요.</div>
                    <div className='sub-info'>재활용 방법이 궁금한 쓰레기의 이름을 입력하거나 사진을 찍어 검색해 보세요.</div>
                    <div className='sub-info'></div>
                    <input className='input-info' placeholder="예) 콜라 라고 검색해 보세요! " />

                    <FaSearch className="icons" size={22} />


                    <label htmlFor="file-upload" className="custom-file-upload"><FaCamera className="icons" size={25} /></label>
                    <input id="file-upload" type="file" accept="image/*" onChange={changeHandler} />
                </div>
                <div className='image'>
                    {/* <img src={mainLogo} alt="mainImage" className="main-image" /> */}
                </div>
            </div>
            {imgSrc ?
                <p className="img-preview-wrapper">
                    {
                        <>
                            <img src={imgSrc} alt="preview" className="preview-img" />
                            <span onClick={searchHandler}>이 이미지로 검색하기  <FaSearch className="icons" size={22} /></span>
                            <span>다른 이미지로 검색하기 </span>
                        </>
                    }
                </p>
                : null
            }
        </div>
    );
}

export default Home;