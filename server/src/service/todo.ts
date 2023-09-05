import TodoModel, { Todo } from "../models/todo";

export class TodoService {
  static async getTodoById(id: string) {
    return TodoModel.findById(id);
  }

  static async createTodo(values: Record<string, any>) {
    const newTodo = new TodoModel(values);
    return newTodo.save().then((todo) => todo.toObject());
  }

  static async deleteTodoById(id: string) {
    return TodoModel.findOneAndDelete({ _id: id });
  }

  static async updateTodoById(id: string, values: Record<string, any>) {
    return TodoModel.findByIdAndUpdate(id, values, { new: true });
  }

  static async getTodosByCriteria(
    userId: string,
    query: string
  ): Promise<Todo[]> {
    return TodoModel.find({
      userId,
      deleteDate: { $exists: false },
      $or: [{ title: { $regex: query } }, { description: { $regex: query } }],
    });
  }
}
