import mongoose, { Schema } from "mongoose";

export const TodoPriorities = ["High", "Medium", "Low"];

const TodoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  priority: {
    type: String,
    enum: TodoPriorities,
    default: "Medium",
  },
  description: String,
  isChecked: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("todo", TodoSchema);
