import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  scan: null,
  piece: null,
  found: null,
  imageUrl: null,
  scanToken: null,
}

const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    setImageUrl(state, action) {
      state.imageUrl = action.payload
    },
    clearImageUrl(state, action) {
      state.imageUrl = null
    },
    setScan(state, action) {
      const { scan, scanToken } = action.payload
      state.scan = scan
      state.scanToken = scanToken
      if (scan.piece) {
        state.piece = scan.piece
        state.found = true
      } else {
        state.found = false
      }
    },
    updateScan(state, action) {},
    clearScan(state, action) {
      state.scan = null
      state.piece = null
      state.found = null
    },
  },
})

export const {
  setImageUrl,
  clearImageUrl,
  setScan,
  clearScan,
} = scanSlice.actions

export default scanSlice.reducer
