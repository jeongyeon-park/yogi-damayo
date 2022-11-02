import Question from '../components/Question';
import Header from '../components/Header';

const BulletinBoard = () => {
    return (
        <div className='BulletinBoard'>
            <Header />
            <div className='bulletinboard-menu'>
                <p>공지사항</p>
                <p>문의하기</p>
            </div>
            <Question />
        </div>
    );
}

export default BulletinBoard;