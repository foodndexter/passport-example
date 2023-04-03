import jwt from "jsonwebtoken"

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY!
const options: jwt.SignOptions = { expiresIn: "1min" }
const useJwt = {
  getAccessToken: (user: any | string | jwt.JwtPayload) => {
    return jwt.sign(user, secretKey, options)
  },
  getRefreshToken: (user: any | string | jwt.JwtPayload) => {
    return jwt.sign(user, secretKey, { ...options, expiresIn: "28days" })
  },
  refreshAccessToken: async (accessToken: string) => {
    try {
      const decoded = await jwt.verify(accessToken, secretKey)
      return jwt.sign(decoded, secretKey, options)
    } catch (error: any) {
      return error
    }
  },
}

export default useJwt
