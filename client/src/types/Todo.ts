export interface Todo {
  _id: string
  title: string
  priority: TodoPriority
  description: string
  isChecked: boolean
  date: Date
}

export type TodoPriority = 'High' | 'Medium' | 'Low'
