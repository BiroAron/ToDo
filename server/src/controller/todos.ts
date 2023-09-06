import { Request, Response } from "express";
import { TodoService } from "../service/todo";
import TodoModel, { Todo } from "../models/todo";
import { get } from "lodash";
import { buildSortPipeline } from "../helpers/index";
// import { sortAndFilterTodos } from "../helpers/index";

export class TodoController {
  static async addTodo(req: Request, res: Response) {
    try {
      const userId = get(req, "identity._id") as string;
      const { title, description, isChecked, priority, date } = req.body;

      const todo = await TodoService.createTodo({
        userId,
        title,
        description,
        priority,
        isChecked,
        date,
      });

      return res.status(201).json(todo);
    } catch (error) {
      console.error("Error during registration:", error);
      return res.sendStatus(500);
    }
  }

  static async getTodos(req: Request, res: Response) {
    try {
      const userId = get(req, "identity._id") as string;
      const query = req.query.query as string;
      const isAscending = req.query.is_ascending === "true";
      const filterBy = req.query.filter_by as
        | "title"
        | "description"
        | "date"
        | "priority";

      const pipeline = buildSortPipeline(userId, query, filterBy, isAscending);

      const todos = await TodoModel.aggregate(pipeline);

      if (!filterBy) {
        const isCheckedTrueTodos = todos.filter(
          (todo) => todo.isChecked === true
        );
        const isCheckedFalseTodos = todos.filter(
          (todo) => todo.isChecked === false
        );

        const sortedTodos = [...isCheckedTrueTodos, ...isCheckedFalseTodos];
        todos.splice(0, todos.length, ...sortedTodos);
      }

      return res.status(200).json(todos);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async getTodo(req: Request, res: Response) {
    try {
      const userId = get(req, "identity._id") as string;
      const todoId = req.params.id;

      const todo = await TodoModel.findOne({ _id: todoId, userId });

      if (!todo) {
        return res.sendStatus(404);
      }

      return res.json(todo);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async deleteTodo(req: Request, res: Response) {
    try {
      const userId = get(req, "identity._id") as string;
      const todoId = req.params.id;

      const todo = await TodoModel.findOne({ _id: todoId, userId });

      if (!todo) {
        return res.sendStatus(404);
      }

      const updatedTodo = await TodoService.updateTodoById(todoId, {
        deleteDate: new Date(),
      });

      if (!updatedTodo) {
        res.sendStatus(500);
        return;
      }

      return res.sendStatus(204);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async updateTodo(req: Request, res: Response) {
    try {
      const todoId = req.params.id;

      const updatedTodo = await TodoService.updateTodoById(todoId, req.body);

      if (!updatedTodo) {
        return res.sendStatus(404);
      }
      return res.json(updatedTodo);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}
