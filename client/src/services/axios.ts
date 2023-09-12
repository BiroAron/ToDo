import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

const token = localStorage.getItem('jwtToken')

if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { axiosInstance }
