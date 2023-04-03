import mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  _id: {
    type: String,
    required: true,
  },
})

export default mongoose.models.User || mongoose.model("User", UserSchema)