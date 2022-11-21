
const KakaoLoginBtn = () => {

    return (
        <a href={process.env.REACT_APP_KAKAO_OAUTH_URL} >
            <img src='img/login_logo/kakao_login_medium_narrow.png' alt='kakao Login' />
        </a>
    );
}

export default KakaoLoginBtn;