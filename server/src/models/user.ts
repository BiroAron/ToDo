import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true },
    salt: { type: String, select: false },
    jwtToken: { type: String, select: false },
  },
});

export default mongoose.model("User", UserSchema);
