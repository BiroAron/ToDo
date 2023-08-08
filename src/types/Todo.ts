export interface Todo {
  title: string
  priority: TodoPriority
  text: string
  isChecked: boolean
  date: string
}

export type TodoPriority = 'High' | 'Medium' | 'Low'
