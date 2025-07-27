import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10_000,
})

api.interceptors.response.use(
  (r) => r,
  (error) => {
    // if token timeouts redirect
    return Promise.reject(error)
  }
)