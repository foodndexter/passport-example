// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { userModel } from "../../../lib/models"
import { connectMongo } from "../../../lib/mongoose"
import bcrypt from "bcryptjs"

type Data = {
  success: boolean
  message?: any
  payload?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await connectMongo()

  try {
    const users = await userModel.find({})
    if (!users || !users.length) {
      return res.send({ success: true, message: "가입된 유저가 없습니다.", payload: [] })
    }
    const { email, password } = req.body
    const foundUser = users.find((user) => user.email === email)
    if (!foundUser) {
      return res.send({ success: false, message: "해당 이메일로 가입한 유저가 없습니다." })
    }
    if (password) {
      const isPwdVerified = await bcrypt.compare(password, foundUser.password)
      if (!isPwdVerified) {
        return res.send({ success: false, message: "비밀번호가 일치하지 않습니다." })
      }

      const payload: any = await userModel.findOne({ email })
      return res.send({ success: true, message: "환영합니다.", payload })
    }
  } catch (error: any) {
    return res.send({ success: false, message: error.message })
  }
}
