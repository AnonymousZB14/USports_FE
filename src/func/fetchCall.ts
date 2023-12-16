import axios, { AxiosError } from 'axios'

const getAxiosInstance = (baseURL: string | undefined, token: string) => {
  if (!baseURL) {
    throw new Error('Base URL is not defined.')
  }

  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_SERVER

if (!baseURL) {
  throw new Error(
    'NEXT_PUBLIC_BACKEND_SERVER is not defined in the environment.',
  )
}

export const axiosInstance = getAxiosInstance(
  baseURL,
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYXBweWhzcnl1QGdtYWlsLmNvbSIsImlhdCI6MTcwMjY0NjE5OCwiZXhwIjoxNzAyODYyMTk4fQ.h79n2LecHwbPN9sQ1Ps_y7FUshmNIr3xI6LKtlGbItM0D8PchsqNWh_iUjZP27NPbPJvLsGeIjsnisldswi9EQ',
)

export async function Postfetch(url: string, data?: any) {
  try {
    const response = await axiosInstance.post(url, data)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}

export async function Getfetch(url: string) {
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
