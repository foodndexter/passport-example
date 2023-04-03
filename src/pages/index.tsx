import Link from "next/link"
import React from "react"

export default function Home() {
  return (
    <div>
      Home
      <div>
        <Link href="signin">로그인</Link>
        <Link href="signup">회원가입</Link>
      </div>
    </div>
  )
}
