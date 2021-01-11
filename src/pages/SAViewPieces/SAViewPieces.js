import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grid } from '@material-ui/core'

import { setMessage } from 'redux/alertSlice'
import Message from 'components/MessageBar'
import Background from 'layouts/Background'
import PageTitle from 'components/PageTitle'
import PieceList from '../MyPieces/components/PieceList'
import LoadingSpinner from 'components/LoadingSpinner'
import ActionButton from 'components/ActionButton'
import FilterButtons from 'components/FilterButtons'
import { setFilter, getPiecesByFilter } from 'redux/piecesSlice'

const title = 'Pieces'

const filterButtons = [
  {
    label: 'Active',
    filterLabel: 'ACTIVE',
  },
  { label: 'All', filterLabel: 'ALL' },
  { label: 'Removed', filterLabel: 'REMOVED' },
]

const MyPieces = () => {
  const pieces = useSelector(getPiecesByFilter)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { filter } = useSelector(state => state.pieces)
  const history = useHistory()

  let pieceLimit = (user || {}).pieceLimit

  const handleClick = () => {
    if (pieceLimit <= pieces.length) {
      dispatch(
        setMessage({
          message: `Sorry, looks like you've reached your piece limit! Please remove a piece or contact an admin to add another piece.`,
        })
      )
    } else {
      history.push('/admin/create/style')
    }
  }

  return (
    <React.Fragment>
      <Message />
      <Background />
      <Container maxWidth="sm">
        <PageTitle title={title} />
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item xs={12}>
            <ActionButton
              onClick={handleClick}
              label="Create New Piece +"
            ></ActionButton>
          </Grid>
          <Grid item>
            <FilterButtons
              items={filterButtons}
              currentFilter={filter}
              filterFunction={setFilter}
            />
          </Grid>
          {!pieces && <LoadingSpinner asOverlay />}
          {pieces && (
            <Grid item>
              <PieceList items={pieces} />
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default MyPieces
