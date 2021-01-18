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
    filter,
  } = useSelector(state => state.pieces)

  const selectPiece = pieceId => {
    return (pieces || []).find(piece => piece.id === pieceId)
  }

  const selectPiecesByUser = username => {
    return pieces.filter(piece => piece.owner.username === username)
  }

  const getPiecesByFilter = () => {
    if (filter === 'REMOVED') {
      return (pieces || []).filter(piece => piece.isRemoved)
    } else if (filter === 'ACTIVE') {
      return (pieces || []).filter(piece => !piece.isRemoved)
    } else {
      return pieces
    }
  }

  return {
    fetchPieces: _fetchPieces,
    createPiece: _createPiece,
    updatePiece: _updatePiece,
    deletePiece: _deletPiece,
    setNewPieceImage: _setPieceImage,
    selectPiece,
    selectPiecesByUser,
    getPiecesByFilter,
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
