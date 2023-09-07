import { axiosInstance } from '../services/axios'
import { Todo } from '../types/Todo'

export async function addNewTodo(todo: Todo) {
  try {
    const response = await axiosInstance.post(
      `/user/todo`, //{{domain}}/user/todo
      {
        title: todo.title,
        priority: todo.priority,
        description: todo.description,
        isChecked: todo.isChecked,
        date: todo.date
      }
    )

    return response.data //userdata
  } catch (error) {
    throw error
  }
}

export async function editCurrentTodo(todo: Todo) {
  try {
    const response = await axiosInstance.patch(`/user/todo/${todo._id}`, {
      title: todo.title,
      priority: todo.priority,
      description: todo.description,
      isChecked: todo.isChecked,
      date: todo.date
    })

    return response.data //userdata
  } catch (error) {
    throw error
  }
}

export async function deleteCurrentTodo(id: string) {
  try {
    const response = await axiosInstance.delete(`/user/todo/${id}`)

    return response.data //userdata
  } catch (error) {
    throw error
  }
}

export async function fetchTodos(
  searchQuery: string,
  filterBy: string,
  isAscending: boolean
) {
  try {
    const url = `/user/todo?query=${searchQuery}&is_ascending=${isAscending}${
      filterBy ? `&filter_by=${filterBy}` : ''
    }`
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}

export async function getCurrentTodo(id: string) {
  try {
    const response = await axiosInstance.get(`/user/todo/${id}`)

    return response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}
