import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  surname: String,
  firstName: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model('User', userSchema)
