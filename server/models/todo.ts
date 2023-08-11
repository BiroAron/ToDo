import mongoose, { Model, Schema } from "mongoose";

type TodoPriority = "High" | "Medium" | "Low";

interface ITodo {
  title: String;
  priority: TodoPriority;
  description?: String;
  isChecked: boolean;
  date: String;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  priority: { type: String, enum: ["High", "Medium", "Low"] },
  description: String,
  isChecked: Boolean,
  date: String,
});

const todo: Model<ITodo> =
  mongoose.models.todo || mongoose.model<ITodo>("todo", TodoSchema);

export default todo;
