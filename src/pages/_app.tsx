import { store } from "@/core"
import axios from "axios"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
