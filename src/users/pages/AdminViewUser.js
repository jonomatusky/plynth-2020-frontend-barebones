import React, { useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Grid,
  Box,
  Button,
  Avatar,
  Typography,
  Link as MuiLink,
} from '@material-ui/core'

import Background from '../../shared/layouts/Background'
import PageTitle from '../../shared/components/ui/PageTitle'
import {
  PieceBox,
  ProfileTopRow,
  CardRow,
  PieceTitle,
  DescriptionBox,
  BottomRow,
  UnstyledLink,
  BarRow,
} from '../../shared/components/ui/CardSections'
import MessageBar from '../../shared/components/notifications/MessageBar'
import PieceList from '../../pieces/components/PieceList'
import { selectUser } from '../../redux/usersSlice'
import { selectPiecesByUser } from '../../redux/piecesSlice'

const title = 'User Profile'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const AdminViewUser = props => {
  const history = useHistory()
  const { username } = useParams()
  const user = useSelector(state => selectUser(state, username))
  console.log(user)
  const pieces = useSelector(state => selectPiecesByUser(state, username))
  console.log(pieces)

  const classes = useStyles()
  const [message, setMessage] = useState((props.location.state || {}).message)

  const handleClosePage = event => {
    const { referrer } = props.location.state || {}
    if (!!referrer) {
      history.push(referrer)
    } else {
      history.push('/admin/users')
    }
  }

  return (
    <React.Fragment>
      <MessageBar
        open={!!message}
        message={message}
        handleClose={() => setMessage(null)}
      />
      <Background />
      <Container maxWidth="xs">
        <PageTitle title={title} />
        {user && pieces && (
          <Grid container justify="flex-start" direction="column">
            <PieceBox container direction="column">
              <BarRow onClick={handleClosePage} buttonLabel="Close X" />
              <React.Fragment>
                <ProfileTopRow
                  container
                  alignContent="center"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={5}>
                    <Grid container justify="center">
                      <Grid item>
                        {user.avatarLink && (
                          <Avatar
                            src={user.avatarLink}
                            alt="Preview"
                            className={classes.large}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={7}>
                    <Box textAlign="left" overflow="hidden">
                      <PieceTitle variant="h5">{user.displayName}</PieceTitle>
                      <Typography variant="body2">
                        <MuiLink
                          href={`mailto:${user.email}`}
                          target="_blank"
                          rel="noopener"
                          color="inherit"
                        >
                          {user.email}
                        </MuiLink>
                      </Typography>
                      <Typography variant="body2">
                        <UnstyledLink
                          to={`/${user.username}`}
                        >{`@${user.username} `}</UnstyledLink>
                      </Typography>
                      <Typography variant="body2">Tier: {user.tier}</Typography>
                      <Typography variant="body2">
                        Pieces: {pieces.length}/{user.pieceLimit}
                      </Typography>
                    </Box>
                  </Grid>
                </ProfileTopRow>
                <BottomRow container justify="center">
                  <Grid>
                    <Button
                      color="inherit"
                      component={Link}
                      to={`/admin/users/${user.username}/edit`}
                    >
                      Edit User
                    </Button>
                  </Grid>
                </BottomRow>
                <>
                  <CardRow container justify="center">
                    <DescriptionBox item xs={11}>
                      <PieceList items={pieces} />
                    </DescriptionBox>
                  </CardRow>
                  <Box height="1rem"></Box>
                </>
              </React.Fragment>
            </PieceBox>
            <Box height="1rem"></Box>
          </Grid>
        )}
      </Container>
    </React.Fragment>
  )
}

export default AdminViewUser
