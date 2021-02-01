import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetchPieces, setFilter } from 'redux/SApiecesSlice'

import { useRequest } from 'hooks/use-request'

export const useSAPiecesStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()
  const { request } = useRequest()

  const [pieceStatus, setPieceStatus] = useState('idle')
  const [updateStatus, setUpdateStatus] = useState('idle')
  const [deleteStatus, setDeleteStatus] = useState('idle')

  const [piece, setPiece] = useState({})

  const _fetchPieces = useCallback(async () => {
    await dispatchThunk(fetchPieces)
  }, [dispatchThunk])

  const fetchPiece = async pieceId => {
    setPieceStatus('loading')
    try {
      console.log('fetching')
      const { piece } = await request({ url: `/pieces/${pieceId}` })
      console.log(piece)
      setPiece(piece)
      setPieceStatus('succeeded')
    } catch (err) {
      setPieceStatus('failed')
      throw err
    }
  }

  const updatePiece = async ({ id, ...inputs }) => {
    setUpdateStatus('loading')
    try {
      const { piece } = await request({
        url: `/pieces/${id}`,
        method: 'PATCH',
        data: inputs,
      })
      setPiece(piece)
      setUpdateStatus('succeeded')
    } catch (err) {
      setUpdateStatus('failed')
      throw err
    }
  }

  const deletePiece = async ({ id }) => {
    setDeleteStatus('loading')
    try {
      await request({ url: `/pieces/${id}`, method: 'DELETE' })
      setDeleteStatus('succeeded')
    } catch (err) {
      setDeleteStatus('failed')
      throw err
    }
  }

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
    fetchPiece,
    updatePiece,
    deletePiece,
    setFilter: _setFilter,
    selectPiece,
    selectPiecesByUser,
    getPiecesByFilter,
    filter,
    pieces,
    piece,
    status,
    pieceStatus,
    updateStatus,
    deleteStatus,
    error,
  }
}
