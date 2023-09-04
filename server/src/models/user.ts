import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export default mongoose.model<User>("user", UserSchema);
