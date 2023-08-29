import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  description: String,
  isChecked: { type: Boolean, default: false },
  date: { type: Date, default: new Date("2023-08-02") },
});

export default mongoose.model("Todo", TodoSchema);
