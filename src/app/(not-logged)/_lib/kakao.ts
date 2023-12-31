const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
const KAKAO_REDIRECT_URI = 'http://3.39.34.245:8080/login/oauth2/code/kakao'
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=account_email`
// http://3.39.34.245:8080/oauth2/login/success
// http://3.39.34.245:8080/oauth2/authorization/kakao

// http://localhost:3000/login/oauth2/code/kakao
// https://usports.vercel.app/login/oauth2/code/kakao