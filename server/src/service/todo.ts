import TodoModel from "../models/todo";

export class TodoService {
  static async getTodoById(id: string) {
    return TodoModel.findById(id);
  }

  static async createTodo(values: Record<string, any>) {
    const newTodo = new TodoModel(values);
    const todo = await newTodo.save();
    return todo.toObject();
  }

  static async deleteTodoById(id: string) {
    return TodoModel.findOneAndDelete({ _id: id });
  }

  static async updateTodoById(id: string, values: Record<string, any>) {
    return TodoModel.findByIdAndUpdate(id, values, { new: true });
  }
}
