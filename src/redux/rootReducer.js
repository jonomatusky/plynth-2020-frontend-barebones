import { combineReducers } from '@reduxjs/toolkit'
import piecesReducer from './piecesSlice'
import userReducer from './authSlice'
import scanReducer from './scanSlice'

const rootReducer = combineReducers({
  pieces: piecesReducer,
  auth: userReducer,
  scan: scanReducer,
})

export default rootReducer
