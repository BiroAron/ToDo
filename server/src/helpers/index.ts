import crypto from "crypto";
import { Todo } from "../models/todo";
import "dotenv/config";

export function random() {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charsetLength = charset.length;

  for (let i = 0; i < 50; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset.charAt(randomIndex);
  }

  return result;
}

export function authentication(salt: string, password: string) {
  console.log(process.env.JWT_SECRET);
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.JWT_SECRET)
    .digest("hex");
}

export function sortTodos(
  todos: Todo[],
  sortCriteria: string,
  sortAscending: boolean
) {
  todos.sort((a, b) => {
    switch (sortCriteria) {
      case "title":
        return sortByTitle(a, b, sortAscending);
      case "description":
        return sortByDescription(a, b, sortAscending);
      case "date":
        return sortByDate(a, b, sortAscending);
      case "priority":
        return sortByPriority(a, b, sortAscending);
      default:
        return;
    }
  });
  return todos;
}

function sortByTitle(a: Todo, b: Todo, sortAscending: boolean) {
  return sortAscending
    ? a.title.localeCompare(b.title)
    : b.title.localeCompare(a.title);
}

function sortByDescription(a: Todo, b: Todo, sortAscending: boolean) {
  return sortAscending
    ? a.description.localeCompare(b.description)
    : b.description.localeCompare(a.description);
}

function sortByDate(a: Todo, b: Todo, sortAscending: boolean) {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (sortAscending) return dateA.getTime() - dateB.getTime();

  return dateB.getTime() - dateA.getTime();
}

function sortByPriority(a: Todo, b: Todo, sortAscending: boolean) {
  const priorityOrder = ["Low", "Medium", "High"];
  const priorityA = priorityOrder.indexOf(a.priority);
  const priorityB = priorityOrder.indexOf(b.priority);

  if (sortAscending) return priorityA - priorityB;

  return priorityB - priorityA;
}
