import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  message: null,
  error: null,
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = (action.payload || {}).message
    },
    setError(state, action) {
      state.error = (action.payload || {}).error
    },
  },
})

export const { setMessage, setError } = messageSlice.actions

export default messageSlice.reducer
