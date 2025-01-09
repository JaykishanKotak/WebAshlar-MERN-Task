/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@token')
      console.error('Unauthorized! Redirecting to login.')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

const APICall = <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  payload: any,
  endpoint: string
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    params: method === 'GET' ? payload : undefined,
    data: method !== 'GET' ? payload : undefined
  }

  return axiosInstance
    .request<T>(config)
    .then((response: any) => {
      return response.data
    })
    .catch((error) => {
      console.log('error', error)
      const errorMessage = error.response?.data || {
        message: error.response?.data.message || error.message,
        status: error.response?.status || 500
      }
      return Promise.reject(errorMessage)
    })
}

export default APICall
