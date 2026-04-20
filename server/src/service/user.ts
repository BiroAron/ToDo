import UserModel, { User } from "../models/user";

export class UserService {
  static async getUsers() {
    return UserModel.find();
  }

  static async getUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  static async getUserById(id: string) {
    return UserModel.findById(id);
  }

  static async createUser(values: User): Promise<User> {
    const newUser = new UserModel(values);
    return newUser.save();
  }

  static async deleteUserById(id: string) {
    return UserModel.findOneAndDelete({ _id: id });
  }

  static async updateUserById(id: string, values: User) {
    return UserModel.findByIdAndUpdate(id, values);
  }
}
