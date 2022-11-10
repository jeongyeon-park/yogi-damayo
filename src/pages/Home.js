import Header from "../components/Header";
import Notice from "./Notice";

import mainLogo from '../util/main-image.jpg';
import mainImg from '../util/main-image-2.jpg';


import { FaSearch, FaCamera } from 'react-icons/fa'

const Home = () => {
    return (
        <div className='Home'>
            <div className='info-wrap'>
                <div className='info'>
                    <div className='main-info'>어디에 버리는 게 좋을까요? 🤔</div>
                    <div className='sub-info'>당신의 재활용을 도와드릴게요.</div>
                    <div className='sub-info'>재활용 방법이 궁금한 쓰레기의 이름을 입력하거나 사진을 찍어 검색해 보세요.</div>
                    <div className='sub-info'></div>
                    <input className='input-info' placeholder="예) 콜라 라고 검색해 보세요! " />
                    <input type="file" accept="image/*" />
                    <FaSearch></FaSearch>
                    <FaCamera></FaCamera>

                </div>
                <div className='image'>
                    {/* <img src={mainLogo} alt="mainImage" className="main-image" /> */}
                </div>
            </div>
        </div>
    );
}

export default Home;