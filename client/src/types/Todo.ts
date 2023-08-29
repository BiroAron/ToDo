export interface Todo {
  _id: string
  title: string
  priority: TodoPriority
  description: string
  isChecked: boolean
  date: string
}

export type TodoPriority = 'High' | 'Medium' | 'Low'
