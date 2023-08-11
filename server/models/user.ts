import mongoose, { Model, Schema } from "mongoose";

interface IUser {
  username: String;
  email: String;
  password: String;
}

const UseSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const user: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", UseSchema);

export default user;
