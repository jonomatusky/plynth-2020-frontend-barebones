import React from 'react'
import { Link, useParams } from 'react-router-dom'
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

import Background from 'layouts/Background'
import PageTitle from 'components/PageTitle'
import {
  PieceBox,
  ProfileTopRow,
  CardRow,
  PieceTitle,
  DescriptionBox,
  BottomRow,
  UnstyledLink,
  BarRow,
} from 'components/CardSections'
import PieceList from '../MyPieces/components/PieceList'
import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import { useSAPiecesStore } from 'hooks/store/use-sa-pieces-store'

const title = 'User Profile'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const SAViewUser = props => {
  const { selectUser } = useSAUsersStore()
  const { selectPiecesByUser } = useSAPiecesStore()
  const { username } = useParams()
  const user = selectUser(username)
  const pieces = selectPiecesByUser(username)

  const classes = useStyles()

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <PageTitle title={title} />
        {user && pieces && (
          <Grid container justify="flex-start" direction="column">
            <PieceBox container direction="column">
              <BarRow buttonLabel="Close X" />
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
                      <Typography
                        variant="body2"
                        style={{ textTransform: 'capitalize' }}
                      >
                        Tier: {user.tier}
                      </Typography>
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
                      to={`/superadmin/users/${user.username}/edit`}
                    >
                      Edit User
                    </Button>
                  </Grid>
                </BottomRow>
                <>
                  <CardRow container justify="center">
                    <DescriptionBox item xs={11}>
                      <PieceList
                        items={pieces.filter(piece => piece.isRemoved !== true)}
                      />
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

export default SAViewUser
