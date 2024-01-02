const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
// const KAKAO_REDIRECT_URI = 'http://localhost:3000/login/kakao'
const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth2/authorization/kakao'

// 이 URL이 카카오 버튼을 클릭했을 때 이동하는 URL
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=account_email`
