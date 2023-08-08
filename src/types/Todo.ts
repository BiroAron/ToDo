export interface Todo {
  title: string
  priority: TodoPriority
  text: string
  isChecked: boolean
  date: number
}

export type TodoPriority = 'High' | 'Medium' | 'Low'
