import { createSlice } from '@reduxjs/toolkit'

// const scanStages = ['ready', 'set, 'going', 'complete']

let initialState = {
  imageUrl: null,
  scan: null,
  foundPiece: null,
  scanToken: null,
  scanStage: 'READY',
}

const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    setImageUrl(state, action) {
      state.imageUrl = action.payload
      state.scanStage = 'SET'
    },
    startScanning(state, action) {
      state.scanStage = 'GOING'
    },
    setScan(state, action) {
      const { scan, scanToken } = action.payload
      state.scan = scan
      state.scanToken = scanToken
      if (scan.piece) {
        state.scanStage = 'FOUND'
        state.foundPiece = scan.piece
      } else {
        state.scanStage = 'NO_MATCH'
        state.found = false
      }
    },
    clearImageUrl(state, action) {
      state.imageUrl = null
      state.scanStage = action.payload
    },
    updateScan(state, action) {},
    clearScan(state, action) {
      state.scan = null
      state.foundPiece = null
      state.imageUrl = null
      state.scanStage = 'READY'
    },
    setScanStage(state, action) {
      state.scanStage = action.payload
    },
  },
})

export const {
  setImageUrl,
  clearImageUrl,
  setScan,
  setPiece,
  clearScan,
  setIsScanning,
  setScanStage,
  startScanning,
} = scanSlice.actions

export default scanSlice.reducer
