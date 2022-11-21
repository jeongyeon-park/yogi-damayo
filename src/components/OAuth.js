
const CLIENT_ID = "7a8c9cf9e63bae4750c392fc2390e44b";
export const KAKAO_REDIRECT_URI = "http://119.209.77.170:9926/oauth/kakao/callback";
export const NAVER_REDIRECT_URI = "http://119.209.77.170:9926/oauth/naver/callback";
//export const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
//export const NAVER_REDIRECT_URI = "http://localhost:3000/oauth/naver/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;