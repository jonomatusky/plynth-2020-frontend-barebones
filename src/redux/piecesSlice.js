import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  pieces: null,
}

const piecesSlice = createSlice({
  name: 'pieces',
  initialState,
  reducers: {
    setPieces(state, action) {
      const { pieces } = action.payload
      state.pieces = pieces
    },
  },
})

export const { setPieces } = piecesSlice.actions

export default piecesSlice.reducer
