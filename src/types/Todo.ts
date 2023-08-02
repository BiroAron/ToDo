export interface Todo {
  id: number
  title: string
  priority: TodoPriority
  text: string
  isChecked: boolean
}

export type TodoPriority = 'High' | 'Medium' | 'Low'
