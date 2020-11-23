import React from 'react'
import { useSelector } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'

import { BottomRow } from './CardSections'

const BottomBar = ({ piece }) => {
  const { status, user } = useSelector(state => state.user)
  const history = useHistory()

  if (status !== 'succeeded') {
    return (
      // <BottomRow container justify="center">
      //   <Grid item>
      //     <Button component={Link} color="inherit" to="/s/subscribe">
      //       Sign Up to Save This Page
      //     </Button>
      //   </Grid>
      // </BottomRow>
      <div></div>
    )
  } else if (status === 'succeeded' && piece.owner.id === user.id) {
    return (
      <BottomRow container justify="center">
        <Grid item>
          <Button
            color="inherit"
            onClick={() => {
              history.push(`/admin/pieces/${piece.id}/edit`)
            }}
          >
            Edit Your Piece
          </Button>
        </Grid>
      </BottomRow>
    )
  } else {
    return <div />
  }
}

export default BottomBar
