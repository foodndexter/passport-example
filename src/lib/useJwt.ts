import jwt from "jsonwebtoken"

const secretKey = process.env.JWT_SECRET_KEY!

export default {
  getAccessToken: (user: UserProps) => {
    return jwt.sign(user._id!, secretKey, { expiresIn: "30s" }, (err, token) => {
      if (err) {
        console.log(err)
        return
      }
      localStorage.setItem("accessToken", token!)
    })
  },
  getRefreshToken: (user: UserProps) => {
    return jwt.sign(user._id!, secretKey, { expiresIn: "30d" }, (err, token) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(token)
    })
  },
  verifyToken: (token: string) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return error
      }
      return decoded
    })
  },
}
