import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../shared/util/client'

let initialState = {
  pieces: null,
  newPieceImage: null,
  status: 'idle',
  error: null,
  updateStatus: 'idle',
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

export const updatePiece = createAsyncThunk(
  'pieces/updatePiece',
  async ({ id, updates }) => {
    const { piece } = await client.request({
      url: `/pieces/${id}`,
      method: 'PATCH',
      data: { piece: updates },
    })
    return piece
  }
)

export const deletePiece = createAsyncThunk(
  'pieces/deletePiece',
  async ({ id }) => {
    console.log('id: ' + id)
    await client.request({ url: `/pieces/${id}`, method: 'DELETE' })
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
      const piece = action.payload
      const matchingIndex = state.pieces.findIndex(isMatch(piece))

      if (matchingIndex >= 0) {
        state.pieces = [
          ...state.pieces.slice(0, matchingIndex),
          ...state.pieces.slice(matchingIndex + 1),
        ]
      }
      state.pieces = [piece, ...state.pieces]
    },
    [deletePiece.fulfilled]: (state, action) => {
      console.log('fulfilled')
      const id = action.payload
      console.log('id')
      const matchingIndex = state.pieces.findIndex(isMatch(id))

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
