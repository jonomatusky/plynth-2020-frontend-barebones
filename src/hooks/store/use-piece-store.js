import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetchPieces,
  createPiece,
  updatePiece,
  deletePiece,
  setNewPieceImage,
} from 'redux/piecesSlice'

export const usePieceStore = () => {
  const dispatch = useDispatch()
  const { dispatchThunk } = useThunk()

  const _fetchPieces = useCallback(() => {
    dispatchThunk(fetchPieces)
  }, [dispatchThunk])

  const _createPiece = useCallback(
    piece => {
      dispatchThunk(createPiece, piece)
    },
    [dispatchThunk]
  )

  const _updatePiece = useCallback(
    ({ id, piece }) => {
      dispatchThunk(updatePiece, { id, ...piece })
    },
    [dispatchThunk]
  )

  const _deletPiece = useCallback(
    ({ id }) => {
      dispatchThunk(deletePiece, { id })
    },
    [dispatchThunk]
  )

  const _setPieceImage = useCallback(
    image => {
      dispatch(setNewPieceImage(image))
    },
    [dispatch]
  )

  const {
    pieces,
    newPieceImage,
    status,
    error,
    updateStatus,
    createStatus,
  } = useSelector(state => state.pieces)

  return {
    fetchPieces: _fetchPieces,
    createPiece: _createPiece,
    updatePiece: _updatePiece,
    deletePiece: _deletPiece,
    setNewPieceImage: _setPieceImage,
    pieces,
    newPieceImage,
    status,
    error,
    updateStatus,
    createStatus,
  }
}
