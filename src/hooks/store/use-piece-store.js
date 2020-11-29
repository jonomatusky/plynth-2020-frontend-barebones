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
  const dispatchThunk = useThunk()

  const _fetchPieces = useCallback(async () => {
    await dispatchThunk(fetchPieces)
  }, [dispatchThunk])

  const _createPiece = useCallback(
    async piece => {
      await dispatchThunk(createPiece, piece)
    },
    [dispatchThunk]
  )

  const _updatePiece = useCallback(
    async ({ id, piece }) => {
      await dispatchThunk(updatePiece, { id, ...piece })
    },
    [dispatchThunk]
  )

  const _deletPiece = useCallback(
    async ({ id }) => {
      await dispatchThunk(deletePiece, { id })
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
