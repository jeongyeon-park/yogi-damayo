
const KakaoLoginBtn = () => {

    return (
        <a href={process.env.REACT_APP_KAKAO_OAUTH_URL} style={{ "textDecoration": "none", "borderRadious": "5px" }}>
            <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "width": "208px", "margin": "0 auto", "height": "45px", "backgroundColor": "#fee500" }}>
                <img src='/img/kakao_LOGO-05.png' style={{ "width": "45px" }} />
                <div style={{ "color": "#381C1E", "marginRight": "14px", "fontSize": "15px", "font-family": "'Noto Sans KR', sans-serif;" }}>카카오 아이디로 로그인</div>
            </div>
        </a>
    );
}

export default KakaoLoginBtn;