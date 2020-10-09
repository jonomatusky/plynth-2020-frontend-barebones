import { combineReducers } from '@reduxjs/toolkit'
import piecesReducer from './piecesSlice'
import userReducer from './authSlice'

const rootReducer = combineReducers({
  pieces: piecesReducer,
  auth: userReducer,
})

export default rootReducer
