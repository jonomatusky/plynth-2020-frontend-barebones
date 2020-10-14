import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: {
    immutableCheck: false,
  },
})

export default store
