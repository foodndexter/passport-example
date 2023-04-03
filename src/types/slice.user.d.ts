type User = { isLoggedIn: boolean } & UserProps

type UserProps = { email: string; password?: string; accessToken?: string; refreshToken?: string; _id?: string }
