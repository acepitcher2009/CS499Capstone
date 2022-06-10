import mongoose from "mongoose";
//schema for users which tells the database what properties to expect
const userSchema = mongoose.Schema({
  name: String,
  role: String,
  email: String,
});

const Users = mongoose.model("Users", userSchema);

export default Users;
