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
  filterBy: string | undefined,
  isAscending: boolean
) {
  try {
    const url = buildTodoURL(searchQuery, filterBy, isAscending)
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}

function buildTodoURL(
  searchQuery: string | undefined,
  filterBy: string | undefined,
  isAscending: boolean
) {
  const baseURL = '/user/todo'
  const queryParameters: string[] = []

  if (searchQuery) {
    queryParameters.push(`query=${searchQuery}`)
  }

  if (filterBy) {
    queryParameters.push(`filter_by=${filterBy}`)
  }

  queryParameters.push(`is_ascending=${isAscending}`)

  const queryString = queryParameters.join('&')
  return `${baseURL}?${queryString}`
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
