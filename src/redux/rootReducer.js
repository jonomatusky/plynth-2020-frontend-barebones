import { combineReducers } from '@reduxjs/toolkit'
import piecesReducer from './piecesSlice'
import userReducer from './userSlice'
import scanReducer from './scanSlice'
import usersReducer from './usersSlice'
import alertReducer from './alertSlice'

const rootReducer = combineReducers({
  pieces: piecesReducer,
  user: userReducer,
  scan: scanReducer,
  users: usersReducer,
  alert: alertReducer,
})

export default rootReducer
