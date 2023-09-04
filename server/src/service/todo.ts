import { sortTodos } from "../helpers/index";
import TodoModel, { Todo } from "../models/todo";

export function getTodoById(id: string) {
  return TodoModel.findById(id);
}

export function createTodo(values: Record<string, any>) {
  const newTodo = new TodoModel(values);
  return newTodo.save().then((todo) => todo.toObject());
}

export function deleteTodoById(id: string) {
  return TodoModel.findOneAndDelete({ _id: id });
}

export function updateTodoById(id: string, values: Record<string, any>) {
  return TodoModel.findByIdAndUpdate(id, values);
}

export function getTodosByCriteria(
  userId: string,
  query: string
): Promise<Todo[]> {
  return TodoModel.find({
    userId,
    deleteDate: { $exists: false },
    $or: [{ title: { $regex: query } }, { description: { $regex: query } }],
  });
}

export function sortAndFilterTodos(
  todos: Todo[],
  filterBy: string,
  isAscending: boolean
): Todo[] {
  if (filterBy === "") {
    const uncheckedTodos = todos.filter((todo) => !todo.isChecked);
    const checkedTodos = todos.filter((todo) => todo.isChecked);
    return [...uncheckedTodos, ...checkedTodos];
  } else {
    return sortTodos(todos, filterBy, isAscending);
  }
}
