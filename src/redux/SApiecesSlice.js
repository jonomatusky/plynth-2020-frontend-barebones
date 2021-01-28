import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  pieces: [],
  filter: 'ACTIVE',
  status: 'idle',
  pieceStatus: 'idle',
  error: null,
}

export const fetchPieces = createAsyncThunk(
  'SApieces/fetchPieces',
  async ({ headers }) => {
    const { pieces } = await client.request({
      headers,
      url: '/pieces',
    })
    return pieces
  }
)

const SApiecesSlice = createSlice({
  name: 'SApieces',
  initialState,
  reducers: {
    clearPieces(state, action) {
      state.pieces = null
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
  },
})

export const { clearPieces, setFilter } = SApiecesSlice.actions

export default SApiecesSlice.reducer
