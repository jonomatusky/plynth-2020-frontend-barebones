import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  message: null,
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setPieces(state, action) {
      state.message = (action.payload || {}).message
    },
  },
})

export const { setMessage } = messageSlice.actions

export default messageSlice.reducer
