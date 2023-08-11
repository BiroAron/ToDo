export interface Todo {
  title: string
  priority: TodoPriority
  description: string
  isChecked: boolean
  date: string
}

export type TodoPriority = 'High' | 'Medium' | 'Low'
