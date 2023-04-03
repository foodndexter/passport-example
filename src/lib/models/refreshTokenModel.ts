import mongoose from "mongoose"

export const RefreshTokenSchema = new mongoose.Schema({
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

export default mongoose.models.RefreshToken || mongoose.model("RefreshToken", RefreshTokenSchema)
