import { combineReducers } from '@reduxjs/toolkit'
import piecesReducer from './piecesSlice'
import authReducer from './authSlice'
import scanReducer from './scanSlice'
import usersReducer from './usersSlice'

const rootReducer = combineReducers({
  pieces: piecesReducer,
  auth: authReducer,
  scan: scanReducer,
  users: usersReducer,
})

export default rootReducer
