import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../shared/util/client'

let initialState = {
  pieces: null,
  newPieceImage: null,
  status: 'idle',
  error: null,
  updateStatus: 'idle',
  createStatus: 'idle',
}

export const fetchPieces = createAsyncThunk(
  'pieces/fetchPieces',
  async ({ config }) => {
    const { pieces } = await client.request({
      url: '/users/me/pieces',
      ...config,
    })
    return pieces
  }
)

export const createPiece = createAsyncThunk(
  'pieces/createPiece',
  async ({ config }) => {
    const { piece } = await client.request({
      url: `/pieces`,
      method: 'POST',
      ...config,
    })
    return piece
  }
)

export const updatePiece = createAsyncThunk(
  'pieces/updatePiece',
  async ({ id, config }) => {
    const { piece } = await client.request({
      url: `/pieces/${id}`,
      method: 'PATCH',
      ...config,
    })
    return piece
  }
)

export const deletePiece = createAsyncThunk(
  'pieces/deletePiece',
  async ({ id, config }) => {
    console.log('id: ' + id)
    await client.request({ url: `/pieces/${id}`, method: 'DELETE', ...config })
    return id
  }
)

const piecesSlice = createSlice({
  name: 'pieces',
  initialState,
  reducers: {
    setPieces(state, action) {
      const { pieces } = action.payload
      state.pieces = pieces
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
    [updatePiece.pending]: (state, action) => {
      state.updateStatus = 'loading'
    },
    [updatePiece.fulfilled]: (state, action) => {
      state.updateStatus = 'idle'
      const updatedPiece = action.payload
      const matchingIndex = state.pieces.findIndex(
        piece => piece.id === updatedPiece.id
      )

      if (matchingIndex >= 0) {
        state.pieces = [
          ...state.pieces.slice(0, matchingIndex),
          ...state.pieces.slice(matchingIndex + 1),
        ]
      }
      state.pieces = [updatedPiece, ...state.pieces]
    },
    [createPiece.pending]: (state, action) => {
      state.createStatus = 'loading'
    },
    [createPiece.fulfilled]: (state, action) => {
      state.createStatus = 'idle'
      const piece = action.payload
      state.pieces = [piece, ...state.pieces]
    },
    [deletePiece.fulfilled]: (state, action) => {
      const id = action.payload
      const matchingIndex = state.pieces.findIndex(piece => piece.id === id)

      if (matchingIndex >= 0) {
        state.pieces = [
          ...state.pieces.slice(0, matchingIndex),
          ...state.pieces.slice(matchingIndex + 1),
        ]
      }
    },
  },
})

export const { setPieces, setPiece, setNewPieceImage } = piecesSlice.actions

export default piecesSlice.reducer

export const selectPiece = (state, pieceId) => {
  return (state.pieces.pieces || []).find(piece => piece.id === pieceId)
}
