import Header from "../components/Header";
import Notice from "./Notice";

const Home = () => {
    return (
        <div className='Home'>
            <div className='info-wrap'>
                <div className='info'>
                    <div className='main-info'>어디에 버리는 게 좋을까요?</div>
                    <div className='sub-info'>이미지 검색도 가능합니다!</div>
                    <div className='sub-info'>사진을 찍어 검색해 보세요</div>
                    <input className='input-info' />
                </div>
                <div className='image'>

                </div>
            </div>
        </div>
    );
}

export default Home;