import { Form } from "@/components"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"

export default function Signup() {
  const [input, setInput] = useState({ email: "", password: "" })
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const emailRef = useRef<null | HTMLInputElement>(null)
  const pwdRef = useRef<null | HTMLInputElement>(null)

  const onNext = () => pwdRef.current?.focus()

  useEffect(() => {
    emailRef.current?.focus()
  }, [])
  const onSubmit = async () => {
    const { email, password } = input
    if (!email) {
      return alert("이메일을 입력하세요.")
    }
    if (!password) {
      return alert("비밀번호를 입력하세요.")
    }

    const { data } = await axios.post("signin", { input })
    if (data) {
      console.log(data)
      const { payload, message, success } = data
      if (success) {
        console.log(payload)
      } else console.log(message)
    }
  }
  return (
    <div>
      <Form title="회원가입" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input name="email" value={input.email} onChange={onChange} placeholder="Enter Your Email" ref={emailRef} />
          <button onClick={onNext} type="button">
            다음
          </button>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input name="password" value={input.password} onChange={onChange} placeholder="Enter Your Password" ref={pwdRef} type="password" />
        </div>
        <button type="submit">회원가입</button>
      </Form>
    </div>
  )
}
