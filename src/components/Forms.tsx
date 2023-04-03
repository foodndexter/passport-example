import React, { PropsWithChildren } from "react"

type Props = { onSubmit?: Function; title?: any } & PropsWithChildren
export default function Forms({ children, onSubmit, title }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit && onSubmit()
      }}>
      {title && <p>{title}</p>}
      {children}
    </form>
  )
}
