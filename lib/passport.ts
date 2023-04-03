import passport from "passport"

type User = { email: string }
type Done = (err: any, id?: unknown) => void

const userModel: any[] = []
passport.serializeUser((user: any, done) => {
  done(null, user.username)
})

passport.deserializeUser((req: any, id: any, done: any) => {
  const user = userModel.find((item) => item.id === id)
  if (!user) {
    return done(null, false)
  }
  done(null, user)
})

export default passport
