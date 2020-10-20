import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grid } from '@material-ui/core'

import { setMessage } from '../../redux/messageSlice'
import Message from '../../shared/components/notifications/Message'
import Background from '../../shared/layouts/Background'
import PageTitle from '../../shared/components/ui/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import ActionButton from '../../shared/components/ui/ActionButton'

const title = 'My Pieces'

const MyPieces = () => {
  const dispatch = useDispatch()
  const { pieces } = useSelector(state => state.pieces)
  const user = useSelector(state => state.user)
  const history = useHistory()

  let pieceLimit = (user || {}).pieceLimit

  const handleClick = () => {
    if (pieceLimit <= pieces.length) {
      dispatch(
        setMessage(
          `Sorry, looks like you've reached your piece limit! Please remove a piece or contact an admin to add another piece.`
        )
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
