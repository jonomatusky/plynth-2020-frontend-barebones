import { combineReducers } from '@reduxjs/toolkit'
import piecesReducer from './piecesSlice'
import userReducer from './userSlice'
import scanReducer from './scanSlice'
import messageReducer from './messageSlice'

const rootReducer = combineReducers({
  pieces: piecesReducer,
  user: userReducer,
  scan: scanReducer,
  message: messageReducer,
})

export default rootReducer
