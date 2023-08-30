import axios from 'axios'
import { Todo } from '../types/Todo'

export async function addNewTodo(todo: Todo) {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/todo`, //{{domain}}/user/todo
      {
        title: todo.title,
        priority: todo.priority,
        description: todo.description,
        isChecked: todo.isChecked,
        date: todo.date
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

export async function editCurrentTodo(todo: Todo) {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/user/todo/${todo._id}`,
      {
        title: todo.title,
        priority: todo.priority,
        description: todo.description,
        isChecked: todo.isChecked,
        date: todo.date
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

export async function deleteCurrentTodo(id: string) {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/user/todo/${id}`,
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

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/todo`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}

export async function getCurrentTodo(id: string) {
  try {
    const token = localStorage.getItem('jwtToken')

    if (!token) {
      throw new Error('JWT token not found')
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/todo/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}
