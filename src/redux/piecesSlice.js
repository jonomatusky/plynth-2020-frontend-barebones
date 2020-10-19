import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../shared/util/client'

let initialState = {
  pieces: null,
  newPieceImage: null,
  status: 'idle',
  error: null,
}

const isMatch = piece => {
  return item => item.id === piece.id
}

export const fetchPieces = createAsyncThunk('pieces/fetchPieces', async () => {
  const { pieces } = await client.request({
    url: '/users/me/pieces',
  })
  return pieces
})

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
    setNewPieceImage(state, action) {
      state.newPieceImage = action.payload
    },
  },
  extraReducers: {
    [fetchPieces.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPieces.fulfilled]: (state, action) => {
      state.status = 'succeeded'

      state.pieces = action.payload
    },
    [fetchPieces.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
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
