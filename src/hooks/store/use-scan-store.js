import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  setImageUrl,
  createScan,
  clearScan,
  setScanStatus,
} from 'redux/scanSlice'

export const useScanStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const {
    status,
    imageUrl,
    foundPiece,
    scanToken,
    scanStage,
    isDirect,
    error,
  } = useSelector(state => state.scan)

  const _setImageUrl = useCallback(
    imageUrl => {
      dispatch(setImageUrl(imageUrl))
    },
    [dispatch]
  )

  const clearImageUrl = useCallback(() => {
    dispatch(setImageUrl(null))
  }, [dispatch])

  const startScan = useCallback(
    async imageSrc => {
      await dispatchThunk(createScan, { imageSrc })
    },
    [dispatchThunk]
  )

  const _clearScan = useCallback(() => {
    dispatch(clearScan())
  }, [dispatch])

  const _setScanStatus = useCallback(
    status => {
      dispatch(setScanStatus(status))
    },
    [dispatch]
  )

  return {
    setImageUrl: _setImageUrl,
    clearImageUrl,
    startScan,
    clearScan: _clearScan,
    setScanStatus: _setScanStatus,
    status,
    imageUrl,
    foundPiece,
    scanToken,
    scanStage,
    isDirect,
    error,
  }
}

export default useScanStore
