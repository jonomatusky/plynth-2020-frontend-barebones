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
      const newPiece = await dispatchThunk(createPiece, piece)
      return newPiece
    },
    [dispatchThunk]
  )

  const _updatePiece = useCallback(
    async ({ id, ...piece }) => {
      await dispatchThunk(updatePiece, { id, ...piece })
    },
    [dispatchThunk]
  )

  const _deletePiece = useCallback(
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
    filter,
  } = useSelector(state => state.pieces)

  const selectPiece = pieceId => {
    return (pieces || []).find(piece => piece.id === pieceId)
  }

  return {
    fetchPieces: _fetchPieces,
    createPiece: _createPiece,
    updatePiece: _updatePiece,
    deletePiece: _deletePiece,
    setNewPieceImage: _setPieceImage,
    selectPiece,
    filter,
    pieces,
    newPieceImage,
    status,
    error,
    updateStatus,
    createStatus,
  }
}

export default usePieceStore
