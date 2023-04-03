import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState: User = {
  isLoggedIn: false,
  email: "",
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userHandler(state, action: PayloadAction<UserProps | undefined>) {
      if (action.payload) {
        return { isLoggedIn: true, ...action.payload }
      } else return initialState
    },
  },
})

export const user = slice.reducer

export const selectUser = (state: RootState) => state.user

export const { userHandler } = slice.actions
