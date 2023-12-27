//func/fetchCall.ts
import axios, { AxiosError } from 'axios'
import { getCookie } from './cookie_c'

const TOKEN = getCookie('accessToken')
const getAxiosInstance = (baseURL: string | undefined, token?: string) => {
  if (!baseURL) {
    throw new Error('Base URL is not defined.')
  }

  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const axiosInstance = getAxiosInstance(
  '/usports',
  TOKEN ? TOKEN + '' : undefined,
)

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
export const setHeaderToken = async (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
