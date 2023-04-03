// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { refreshTokenModel, userModel } from "../../../lib/models"
import { connectMongo } from "../../../lib/mongoose"
import bcrypt from "bcryptjs"
import useJwt from "../../../lib/jwt"
import crypto from "crypto"

type Data = {
  success: boolean
  message?: any
  payload?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await connectMongo()

  const password = await bcrypt.hash(req.body.password, 12)
  const { email } = req.body
  try {
    const check = await userModel.findOne({ email })
    if (check) {
      return res.send({ success: false, message: "이미 존재하는 이메일 입니다." })
    }
  } catch (error: any) {
    return res.send({ success: false, message: error.message })
  }
  const _id = crypto.randomBytes(16).toString("hex")
  try {
    const user = { email, password, _id }
    const accessToken = useJwt.getAccessToken(user)
    const refreshToken = useJwt.getRefreshToken(user)
    try {
      await refreshTokenModel.create({ _id, refreshToken })
    } catch (err: any) {
      return res.send({ success: false, message: "리프레쉬 토큰 발급에 문제가 있습니다." })
    }
    const result = await userModel.create(user)
    return res.send({ success: true, payload: { result, accessToken, refreshToken } })
  } catch (error: any) {
    await refreshTokenModel.findByIdAndDelete(_id)
    return res.send({ success: false, message: error.message })
  }
}
