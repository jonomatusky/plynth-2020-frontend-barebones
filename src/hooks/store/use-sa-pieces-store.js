import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetchPieces, setFilter } from 'redux/SApiecesSlice'

export const useSAPiecesStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchPieces = useCallback(async () => {
    await dispatchThunk(fetchPieces)
  }, [dispatchThunk])

  const _setFilter = useCallback(
    filter => {
      dispatch(setFilter(filter))
    },
    [dispatch]
  )

  const { pieces, status, error, filter } = useSelector(state => state.SApieces)

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
    setFilter: _setFilter,
    selectPiece,
    selectPiecesByUser,
    getPiecesByFilter,
    filter,
    pieces,
    status,
    error,
  }
}
