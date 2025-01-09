import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userInfo: User | null
}

interface User {
  id: string
  name: string
  email: string
  token: string
}

const initialState: UserState = {
  userInfo: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload
    },
    logout: (state) => {
      state.userInfo = null
    }
  }
})

export const { setUserInfo, logout } = userSlice.actions

export default userSlice.reducer
