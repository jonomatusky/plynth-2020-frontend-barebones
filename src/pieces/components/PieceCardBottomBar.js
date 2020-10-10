import React from 'react'
import { useSelector } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'

import { BottomRow } from '../../shared/components/ui/CardSections'

const BottomBar = ({ piece }) => {
  const { user } = useSelector(state => state.auth)
  const history = useHistory()

  if (!user) {
    return (
      <BottomRow container justify="center">
        <Grid item>
          <Button
            component={Link}
            color="inherit"
            to="/s/subscribe"
            target="_blank"
          >
            Sign Up to Save This Page
          </Button>
        </Grid>
      </BottomRow>
    )
  } else if (piece.owner.id === user.id) {
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
