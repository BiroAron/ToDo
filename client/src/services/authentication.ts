import axios from 'axios'
import { User } from '../types/User'

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        email,
        password
      }
    )
    localStorage.setItem('jwtToken', response.data.token)
    localStorage.setItem('firstName', response.data.firstName)
    console.log('eddig megy')
  } catch (error) {
    throw error
  }
}

export async function registerUser(user: User) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      {
        email: user.email,
        password: user.password,
        firstname: user.firstName,
        lastname: user.lastName
      }
    )

    return response.data //userdata
  } catch (error) {
    throw error
  }
}
