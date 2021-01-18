import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

const initialState = {
  scans: [],
  dailyScanCount: null,
  monthlyScanCount: null,
  status: 'idle',
}

let endDate = new Date()
let startDateDaily = new Date()
let startDateMonthly = new Date()
startDateDaily.setDate(endDate.getDate() - 1)
startDateMonthly.setDate(endDate.getDate() - 30)

export const fetchScans = createAsyncThunk(
  'SAscans/fetchScans',
  async ({ headers, ...params }) => {
    const { scans } = await client.request({
      headers,
      url: '/scans',
      params,
    })
    return scans
  }
)

export const countDailyScans = createAsyncThunk(
  'SAscans/countDailyScans',
  async ({ headers }) => {
    const { scanCount } = await client.request({
      headers,
      url: `/scans/count?startDate=${startDateDaily}`,
    })
    return scanCount
  }
)

export const countMonthlyScans = createAsyncThunk(
  'SAscans/countMonthlyScans',
  async ({ headers }) => {
    const { scanCount } = await client.request({
      headers,
      url: `/scans/count?startDate=${startDateMonthly}`,
    })
    return scanCount
  }
)

const SAscansSlice = createSlice({
  name: 'SAscans',
  initialState,
  reducers: {
    clearScans(state, action) {
      state.scans = []
      state.dailyScanCount = null
      state.monthlyScanCount = null
      state.status = 'idle'
    },
  },
  extraReducers: {
    [fetchScans.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchScans.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.scans = [...state.scans, ...action.payload]
    },
    [fetchScans.rejected]: (state, action) => {
      state.status = 'failed'
      // state.error = action.error.message
    },
    [countDailyScans.pending]: (state, action) => {
      state.dailyCountStatus = 'loading'
    },
    [countDailyScans.fulfilled]: (state, action) => {
      state.dailyCountStatus = 'succeeded'
      state.dailyScanCount = action.payload
    },
    [countDailyScans.rejected]: (state, action) => {
      state.dailyCountStatus = 'failed'
      // state.error = action.error.message
    },
    [countMonthlyScans.pending]: (state, action) => {
      state.monthlyCountStatus = 'loading'
    },
    [countMonthlyScans.fulfilled]: (state, action) => {
      state.monthlyCountStatus = 'succeeded'
      state.monthlyScanCount = action.payload
    },
    [countMonthlyScans.rejected]: (state, action) => {
      state.monthlyCountStatus = 'failed'
      // state.error = action.error.message
    },
  },
})

export const { clearScans } = SAscansSlice.actions

export default SAscansSlice.reducer
