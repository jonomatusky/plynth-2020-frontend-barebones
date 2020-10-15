import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container, Grid } from '@material-ui/core'

import MessageBar from '../../shared/components/notifications/MessageBar'
import PageTitle from '../../shared/components/ui/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import ActionButton from '../../shared/components/ui/ActionButton'
import FilterButtons from '../../shared/components/ui/FilterButtons'
import { setFilter, getPiecesByFilter } from '../../redux/piecesSlice'

const title = 'My Pieces'

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
  const user = useSelector(state => state.user)
  const { filter } = useSelector(state => state.pieces)
  const history = useHistory()
  const [message, setMessage] = useState(null)

  let pieceLimit = (user || {}).pieceLimit

  const handleClick = () => {
    if (pieceLimit <= pieces.length) {
      setMessage(
        `Sorry, looks like you've reached your piece limit! Please remove a piece or contact an admin to add another piece.`
      )
    } else {
      history.push('/admin/create/style')
    }
  }

  return (
    <React.Fragment>
      <MessageBar
        open={!!message}
        message={message}
        handleClose={() => setMessage(null)}
      />
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
