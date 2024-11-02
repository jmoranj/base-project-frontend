import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
})

const refreshAccessToken = async () => {
  try {
    const response = await api.post('/users/refresh-token')
    const newAccessToken = response.data.token

    Cookies.set('accessToken', newAccessToken, { expires: 1 })

    return newAccessToken
  } catch (error) {
    console.error('Error refreshing access token', error)
  }
}

api.interceptors.request.use(
  (req) => {
    const token = Cookies.get('accessToken')
    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized - Redirecting to login')
      const newAccessToken = await refreshAccessToken()

      if (newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`

        return api.request(error.config)
      } else {
        console.log('Failed to refresh token - Redirecting to Login')

        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }

      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    console.error('Response Error:', error)
    return Promise.reject(error)
  },
)

export default api
