import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import Link from "next/link"

export default function Login() {
  const [input, setInput] = useState({ email: "dexteryoon@icloud.com", password: "123123" })
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = input
    if (!email) {
      return alert("이메일을 입력하세요.")
    }
    if (!password) {
      return alert("비밀번호를 입력하세요.")
    }

    const res = await axios.post("signin", { ...input })

    if (res.data) {
      console.log(res.data)
      const { message } = res.data
      if (message === "가입된 유저가 없습니다.") {
        console.log("signup")
      }
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const emailRef = useRef<null | HTMLInputElement>(null)
  const pwdRef = useRef<null | HTMLInputElement>(null)

  const emailFocus = () => emailRef.current?.focus()
  const pwdFocus = () => pwdRef.current?.focus()
  useEffect(() => {
    emailFocus()
  }, [])
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor={"email"}>이메일</label>
        <input type="text" value={input.email} name="email" onChange={onChange} placeholder="Enter Email" id="email" ref={emailRef} />
        <button onClick={pwdFocus} type="button">
          다음
        </button>
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input type="password" value={input.password} name="password" onChange={onChange} id="password" placeholder="Enter Password" ref={pwdRef} />
      </div>
      <button type="submit">로그인</button>
      <Link href={"/signup"}>회원가입</Link>
    </form>
  )
}
