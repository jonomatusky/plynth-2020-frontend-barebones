import { useCallback, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { AuthContext } from 'contexts/auth-context'
import {
  setImageUrl,
  createScan,
  clearScan,
  setScanStatus,
} from 'redux/scanSlice'

export const useScanStore = () => {
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()

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
      try {
        const headers = {}
        auth.token && (headers.Authorization = 'Bearer ' + auth.token)

        const resultAction = await dispatch(createScan({ headers, imageSrc }))

        const result = unwrapResult(resultAction)

        return result
      } catch (err) {}
    },
    [auth.token, dispatch]
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
