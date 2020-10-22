import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../shared/util/client'

let initialState = {
  pieces: [],
  newPieceImage: null,

  filter: 'ACTIVE',
  status: 'idle',
  error: null,
  updateStatus: 'idle',
  createStatus: 'idle',
}

export const fetchPieces = createAsyncThunk(
  'pieces/fetchPieces',
  async ({ headers }) => {
    const { pieces } = await client.request({
      headers,
      url: '/pieces',
    })
    return pieces
  }
)

export const createPiece = createAsyncThunk(
  'pieces/createPiece',
  async ({ headers, ...inputs }) => {
    const { piece } = await client.request({
      headers,
      url: `/pieces`,
      method: 'POST',
      data: inputs,
    })
    return piece
  }
)

export const updatePiece = createAsyncThunk(
  'pieces/updatePiece',
  async ({ headers, id, ...inputs }) => {
    const { piece } = await client.request({
      headers,
      url: `/pieces/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return piece
  }
)

export const deletePiece = createAsyncThunk(
  'pieces/deletePiece',
  async ({ headers, id, ...rest }) => {
    await client.request({ headers, url: `/pieces/${id}`, method: 'DELETE' })
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
      state.loaded = true
    },
    setNewPieceImage(state, action) {
      state.newPieceImage = action.payload
    },
    clearPieces(state, action) {
      state.pieces = []
      state.newPieceImage = null
      state.status = 'idle'
      state.error = null
      state.updateStatus = 'idle'
      state.createStatus = 'idle'
    },
    setFilter(state, action) {
      state.filter = action.payload
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
    [updatePiece.rejected]: (state, action) => {
      state.updateStatus = 'failed'
      state.error = action.error.message
    },
    [createPiece.pending]: (state, action) => {
      state.createStatus = 'loading'
    },
    [createPiece.fulfilled]: (state, action) => {
      state.createStatus = 'idle'
      const piece = action.payload
      state.pieces = [piece, ...state.pieces]
    },
    [createPiece.rejected]: (state, action) => {
      state.createStatus = 'failed'
      state.error = action.error.message
    },
    [deletePiece.fulfilled]: (state, action) => {
      const id = action.payload
      const matchingIndex = state.pieces.findIndex(piece => piece.id === id)

      const piece = state.pieces[matchingIndex]
      const removedPiece = { ...piece, isRemoved: true }

      if (matchingIndex >= 0) {
        state.pieces = [
          ...state.pieces.slice(0, matchingIndex),
          ...state.pieces.slice(matchingIndex + 1),
        ]
      }
      state.pieces = [removedPiece, ...state.pieces]
    },
  },
})

export const {
  setPieces,
  setPiece,
  setNewPieceImage,
  setFilter,
  clearPieces,
} = piecesSlice.actions

export default piecesSlice.reducer

export const selectPiecesByUser = (state, username) => {
  return state.pieces.pieces.filter(piece => piece.owner.username === username)
}

export const getPiecesByFilter = state => {
  if (state.pieces.filter === 'REMOVED') {
    return state.pieces.pieces.filter(piece => piece.isRemoved)
  } else if (state.pieces.filter === 'ACTIVE') {
    return state.pieces.pieces.filter(piece => !piece.isRemoved)
  } else {
    return state.pieces.pieces
  }
}

export const selectPiece = (state, pieceId) => {
  return (state.pieces.pieces || []).find(piece => piece.id === pieceId)
}
