import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetchScans,
  clearScans,
  countDailyScans,
  countMonthlyScans,
} from 'redux/SAscansSlice'

export const useSAScansStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchScans = useCallback(
    async params => {
      await dispatchThunk(fetchScans, params)
    },
    [dispatchThunk]
  )

  const _clearScans = useCallback(async () => {
    await dispatch(clearScans)
  }, [dispatch])

  const _countDailyScans = useCallback(async () => {
    await dispatchThunk(countDailyScans)
  }, [dispatchThunk])

  const _countMonthlyScans = useCallback(async () => {
    await dispatchThunk(countMonthlyScans)
  }, [dispatchThunk])

  const { scans, dailyScanCount, monthlyScanCount, status } = useSelector(
    state => state.SAscans
  )

  return {
    fetchScans: _fetchScans,
    clearScans: _clearScans,
    countDailyScans: _countDailyScans,
    countMonthlyScans: _countMonthlyScans,
    scans,
    dailyScanCount,
    monthlyScanCount,
    status,
  }
}
