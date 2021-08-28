import mongoose from "mongoose";
const { Schema } = mongoose;

const model = new Schema({
  /** TODO */
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailOptIn: { type: Boolean, default: false },
});

export default mongoose.model("User", model, "users");
