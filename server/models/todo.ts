import mongoose, { Model, Schema } from "mongoose";

type TodoPriority = "High" | "Medium" | "Low";

interface ITodo {
  title: String;
  priority: TodoPriority;
  description?: String;
  isChecked: boolean;
  date: Date;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  priority: { type: String, enum: ["High", "Medium", "Low"] },
  description: String,
  isChecked: Boolean,
  date: Date,
});

export default mongoose.models.todo ||
  mongoose.model<ITodo>("todo", TodoSchema);
