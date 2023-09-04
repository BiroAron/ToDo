import { Todo } from "models/todo";
import UserModel, { User } from "../models/user";

export function getUsers() {
  return UserModel.find();
}

export function getUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function getUserById(id: string) {
  return UserModel.findById(id);
}

export function createUser(values: User) {
  const newUser = new UserModel(values);
  return newUser.save().then((user) => user.toObject());
}

export function deleteUserById(id: string) {
  return UserModel.findOneAndDelete({ _id: id });
}

export function updateUserById(id: string, values: User) {
  return UserModel.findByIdAndUpdate(id, values);
}

export function getFilteredTodos(id: string, values: Todo) {}
