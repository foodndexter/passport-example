import mongoose from "mongoose"

export const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
})

export default mongoose.models.RefreshToken || mongoose.model("RefreshToken", RefreshTokenSchema)
