import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  dob: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model('User', userSchema)
