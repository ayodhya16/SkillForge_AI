import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // change if backend runs on different host/port
  headers: {
    'Content-Type': 'application/json'
  }
})

// attach token to each request if present
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('sf_token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

export default axiosInstance
