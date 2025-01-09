import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CommonState {
  isLoading: boolean
}

const initialState: CommonState = {
  isLoading: false
}

const commonSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { toggleLoader } = commonSlice.actions

export default commonSlice.reducer
