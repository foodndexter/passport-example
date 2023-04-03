import React from "react"
import axios from "axios"

type Props = { path: string; method: Methods; params?: any }

export default function useAxios({ method, path }: Props) {
  const url = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL! })

  return <div>useAxios</div>
}
