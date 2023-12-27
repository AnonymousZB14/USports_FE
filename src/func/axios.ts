import axios from 'axios'
import LocalStorage from './localstrage'
import { cookies } from 'next/headers'

axios.interceptors.request.use(
  (config) => {
    const accessToken = LocalStorage.getItem('accessToken')
    const cookieStore = cookies()
    const c_accessToken = cookieStore.get('connect.sid')

    config.headers['Authorization'] = `Bearer ${accessToken}` // 여기에 설정하면 모든 요청에 Authrization 토큰이 포함된다.
    config.headers['Authorization'] = `Bearer ${c_accessToken}` // 여기에 설정하면 모든 요청에 Authrization 토큰이 포함된다.

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 여기에서 response에 대한 처리를 하게 되면 전체 응답에 대한 공통 처리를 할 수 있다.
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않은 경우의 처리
    }
    return Promise.reject(error)
  },
)
