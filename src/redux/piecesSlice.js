import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  pieces: null,
}

const isMatch = piece => {
  return item => item.id === piece.id
}

const piecesSlice = createSlice({
  name: 'pieces',
  initialState,
  reducers: {
    setPieces(state, action) {
      const { pieces } = action.payload
      state.pieces = pieces
    },
    setPiece(state, action) {
      const { piece } = action.payload
      const matchingIndex = state.pieces.findIndex(isMatch(piece))

      if (matchingIndex >= 0) {
        state.pieces = [
          ...state.pieces.slice(0, matchingIndex),
          ...state.pieces.slice(matchingIndex + 1),
        ]
      }
      state.pieces = [piece, ...state.pieces]
    },
    deletePiece(state, action) {
      const { piece } = action.payload
      const matchingIndex = state.pieces.findIndex(isMatch(piece))

      if (matchingIndex >= 0) {
        state.pieces = [
          ...state.pieces.slice(0, matchingIndex),
          ...state.pieces.slice(matchingIndex + 1),
        ]
      }
    },
  },
})

export const { setPieces, setPiece, deletePiece } = piecesSlice.actions

export default piecesSlice.reducer
