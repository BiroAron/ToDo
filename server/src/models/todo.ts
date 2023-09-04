import mongoose, { ObjectId, Schema, Document } from "mongoose";

export const TodoPriorities = ["High", "Medium", "Low"];
type TodoPriorityType = "High" | "Medium" | "Low";

const TodoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  priority: {
    type: String,
    enum: TodoPriorities,
    default: TodoPriorities[1],
  },
  description: String,
  isChecked: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  deleteDate: { type: Date },
});

export interface Todo extends Document {
  userId: ObjectId;
  date: Date;
  title: string;
  priority: TodoPriorityType;
  isChecked: boolean;
  description?: string;
  deleteDate?: Date;
}

export default mongoose.model<Todo>("todo", TodoSchema);
