import { axiosInstance } from '../services/axios'
import { User } from '../types/User'

export async function loginUser(email: string, password: string) {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
      email,
      password
    })
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${response.data.token}`
    localStorage.setItem('jwtToken', response.data.token)
    localStorage.setItem('firstName', response.data.user.firstname)

    return response.data
  } catch (error) {
    throw error
  }
}

export async function registerUser(user: User) {
  try {
    const response = await axiosInstance.post(`/auth/register`, {
      email: user.email,
      password: user.password,
      firstname: user.firstName,
      lastname: user.lastName
    })
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${response.data.token}`
    localStorage.setItem('jwtToken', response.data.token)
    localStorage.setItem('firstName', response.data.user.firstname)

    return response.data
  } catch (error) {
    throw error
  }
}
