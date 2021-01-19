import { combineReducers } from '@reduxjs/toolkit'
import piecesReducer from './piecesSlice'
import SApiecesReducer from './SApiecesSlice'
import userReducer from './userSlice'
import SAusersReducer from './SAusersSlice'
import scanReducer from './scanSlice'
import SAscansReducer from './SAscansSlice'
import alertReducer from './alertSlice'

const rootReducer = combineReducers({
  user: userReducer,
  pieces: piecesReducer,
  scan: scanReducer,
  alert: alertReducer,
  SAusers: SAusersReducer,
  SApieces: SApiecesReducer,
  SAscans: SAscansReducer,
})

export default rootReducer
