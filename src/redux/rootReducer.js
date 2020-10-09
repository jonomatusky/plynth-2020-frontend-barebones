import { combineReducers } from '@reduxjs/toolkit'
import piecesReducer from './piecesSlice'
import userReducer from './userSlice'

const rootReducer = combineReducers({
  pieces: piecesReducer,
  user: userReducer,
})

export default rootReducer
