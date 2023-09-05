import express from "express";
import {
  createTodo,
  getTodosByCriteria,
  updateTodoById,
} from "../service/todo";
import TodoModel from "../models/todo";
import { get } from "lodash";
import { sortAndFilterTodos } from "helpers";

export async function addTodo(req: express.Request, res: express.Response) {
  try {
    const userId = get(req, "identity._id") as string;
    const { title, description, isChecked, priority, date } = req.body;

    const todo = await createTodo({
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

export async function getTodos(req: express.Request, res: express.Response) {
  try {
    const userId = get(req, "identity._id") as string;
    const query = req.query.query as string;
    const filterBy = req.query.filter_by as
      | "title"
      | "description"
      | "date"
      | "priority";
    const isAscending = req.query.is_ascending === "true";

    const todos = await getTodosByCriteria(userId, query);

    const sortedAndFilteredTodos = sortAndFilterTodos(
      todos,
      filterBy,
      isAscending
    );

    todos.splice(0, todos.length, ...sortedAndFilteredTodos);

    return res.status(201).json(todos);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getTodo(req: express.Request, res: express.Response) {
  try {
    const userId = get(req, "identity._id") as string;
    const todoId = req.params.id;

    const todo = await TodoModel.findOne({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.json(todo);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function deleteTodo(req: express.Request, res: express.Response) {
  try {
    const userId = get(req, "identity._id") as string;
    const todoId = req.params.id;

    const todo = await TodoModel.findOne({ _id: todoId, userId });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.deleteDate = new Date();
    await todo.save();

    return res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function updateTodo(req: express.Request, res: express.Response) {
  try {
    const userId = get(req, "identity._id") as string;
    const todoId = req.params.id;

    const updatedTodo = await updateTodoById(todoId, req.params);

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json(updatedTodo);
  } catch (error) {
    return res.sendStatus(500);
  }
}
