
import { KAKAO_AUTH_URL } from './OAuth';


const KakaoLoginBtn = () => {

    return (
        <a href={KAKAO_AUTH_URL} >
            <img src='img/login_logo/kakao_login_medium_narrow.png' alt='kakao Login' />
        </a>
    );
}

export default KakaoLoginBtn;