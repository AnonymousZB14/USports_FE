'use client'
//func/fetchCall.ts
import axios, { AxiosError } from 'axios'
import { getCookie } from './cookie_c'
import { useRecoilState } from 'recoil'
import { UserTokenState } from '@/store/user'
import LocalStorage from './localstrage'

const TOKEN = getCookie('accessToken')
const getAxiosInstance = (baseURL: string | undefined) => {
  if (!baseURL) {
    throw new Error('Base URL is not defined.')
  }

  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${TOKEN}`,
    },
  })
}

export const axiosInstance = getAxiosInstance('/usports')
axiosInstance.interceptors.request.use((config) => {
  const accessToken = LocalStorage.getItem('accessToken')
  const c_accessToken = getCookie('accessToken')

  config.headers['Authorization'] = `Bearer ${accessToken}` // 여기에 설정하면 모든 요청에 Authrization 토큰이 포함된다.
  config.headers['Authorization'] = `Bearer ${c_accessToken}` // 여기에 설정하면 모든 요청에 Authrization 토큰이 포함된다.

  return config
})
export async function Postfetch(url: string, data?: any, accesstoken?: string) {
  try {
    const response = await axiosInstance.post(url, data)
    return response
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}
export async function Getfetch(url: string, accessToken?: string) {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}

export async function Putfetch(url: string, data?: any) {
  try {
    const response = await axiosInstance.put(url, data)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}

export async function Deletefetch(url: string) {
  try {
    const response = await axiosInstance.delete(url)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}
export async function GetPOSTfetch(url: string, tags: string[]) {
  try {
    const response = await fetch(url, {
      next: {
        tags: tags,
      },
      credentials: 'include',
      headers: {
        credentials: 'include',
        // Authorization: `Bearer ${'API_TOKEN'}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  } catch (error) {
    const axiosError = error as AxiosError
    // Handle errors here
    throw axiosError
  }
}
export const setHeaderToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
