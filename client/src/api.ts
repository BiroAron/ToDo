import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080'

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password
    })
    localStorage.setItem('jwtToken', response.data.token)
  } catch (error) {
    throw error
  }
}

export async function registerUser(email, password, firstname, lastname) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      password,
      firstname,
      lastname
    })

    return response.data //userdata
  } catch (error) {
    throw error
  }
}

export async function addNewTodo(
  title,
  priority,
  description,
  isChecked,
  date
) {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await axios.post(
      `${API_BASE_URL}/users/add-todo`,
      {
        title,
        priority,
        description,
        isChecked,
        date
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data //userdata
  } catch (error) {
    throw error
  }
}

export async function editCurrentTodo(
  id,
  title,
  priority,
  description,
  isChecked,
  date
) {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await axios.patch(
      `${API_BASE_URL}/users/update-todo/${id}`,
      {
        title,
        priority,
        description,
        isChecked,
        date
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data //userdata
  } catch (error) {
    throw error
  }
}

export async function deleteCurrentTodo(id: number) {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await axios.delete(
      `${API_BASE_URL}/users/delete-todo/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data //userdata
  } catch (error) {
    throw error
  }
}

export async function fetchTodos() {
  try {
    const token = localStorage.getItem('jwtToken')

    if (!token) {
      throw new Error('JWT token not found')
    }

    const response = await axios.get(`${API_BASE_URL}/users/get-all-todos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}
