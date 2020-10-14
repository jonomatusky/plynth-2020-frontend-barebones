import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  pieces: [],
  newPieceImage: null,
  currentPiece: null,
  loaded: false,
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
      state.loaded = true
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
    setCurrentPiece(state, action) {
      const pieceId = action.payload
      if (state.pieces) {
        state.currentPiece = state.pieces.find(piece => piece.id === pieceId)
      }
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
    setNewPieceImage(state, action) {
      state.newPieceImage = action.payload
    },
  },
})

export const {
  setPieces,
  setPiece,
  deletePiece,
  setNewPieceImage,
} = piecesSlice.actions

export default piecesSlice.reducer
