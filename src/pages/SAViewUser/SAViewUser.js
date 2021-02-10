import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  Link as MuiLink,
} from '@material-ui/core'

import ShareIcon from '@material-ui/icons/Share'

import PageTitle from 'components/PageTitle'
import { UnstyledLink, DescriptionText } from 'components/CardSections'
import UserCard from 'components/UserCard'
import PieceList from '../SAViewPieces/components/PieceList'
import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import { useSAPiecesStore } from 'hooks/store/use-sa-pieces-store'

const title = 'User Profile'
const { REACT_APP_PUBLIC_URL } = process.env

const SAViewUser = props => {
  const history = useHistory()
  const { selectUser } = useSAUsersStore()
  const { selectPiecesByUser } = useSAPiecesStore()
  const { username } = useParams()
  const user = selectUser(username) || {}
  const pieces = selectPiecesByUser(username)

  const handleLinkShare = async text => {
    await navigator.clipboard.writeText(text)
  }

  const claimLink = `${REACT_APP_PUBLIC_URL}/${username}/preview/${user.id}`

  const { links, bio, ...userForCard } = user || {}

  return (
    <Container maxWidth="xs">
      <PageTitle title={title} />
      {user && pieces && (
        <>
          <Grid item xs={12}>
            <UserCard
              user={userForCard}
              onClose={history.push('/superadmin/users')}
              subtitle={
                <>
                  {user.email ? (
                    <Typography variant="body2">
                      <MuiLink
                        href={`mailto:${user.email}`}
                        target="_blank"
                        rel="noopener"
                        color="inherit"
                      >
                        {user.email}
                      </MuiLink>{' '}
                      <UnstyledLink
                        textDecoration="underline"
                        to={`/superadmin/users/${username}/change/email`}
                      >
                        edit
                      </UnstyledLink>
                    </Typography>
                  ) : (
                    <Typography variant="body2">Not Active</Typography>
                  )}
                  <Typography variant="body2">
                    <UnstyledLink
                      to={`/${user.username}`}
                    >{`@${user.username} `}</UnstyledLink>
                    <UnstyledLink
                      textDecoration="underline"
                      to={`/superadmin/users/${username}/change/username`}
                    >
                      edit
                    </UnstyledLink>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ textTransform: 'capitalize' }}
                  >
                    Tier: {user.tier}
                  </Typography>
                  <Typography variant="body2">
                    Pieces:{' '}
                    {pieces.filter(piece => piece.isRemoved !== true).length}/
                    {user.pieceLimit}
                  </Typography>
                  <Typography variant="body2">
                    Last Active:{' '}
                    {user.lastActiveAt
                      ? new Date(user.lastActiveAt).toLocaleDateString()
                      : 'N/A'}
                  </Typography>
                </>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              borderColor="secondary.main"
              bgcolor="background.card"
              borderLeft={1}
              borderRight={1}
              borderBottom={1}
            >
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Button
                      component={Link}
                      to={`/superadmin/users/${user.username}/edit`}
                    >
                      Edit User
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {!user.lastActiveAt && (
                    <Box
                      borderColor="secondary.main"
                      borderTop={1}
                      pt={2}
                      pb={2}
                    >
                      <Grid container justify="center" spacing={1}>
                        <Grid item xs={11}>
                          <Typography>Link to claim their profile:</Typography>
                        </Grid>
                        <Grid item xs={11}>
                          <DescriptionText>{claimLink}</DescriptionText>
                        </Grid>
                        <Grid item xs={11}>
                          <Button
                            onClick={() => handleLinkShare(claimLink)}
                            endIcon={<ShareIcon />}
                            variant="contained"
                          >
                            Copy Link
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  <Box borderColor="secondary.main" borderTop={1} pt={2} pb={2}>
                    <Grid container justify="center">
                      <Grid item xs={11}>
                        {pieces.length > 0 ? (
                          <PieceList
                            items={pieces.filter(
                              piece => piece.isRemoved !== true
                            )}
                          />
                        ) : (
                          <Typography variant="h5" align="center">
                            No Pieces
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </>
      )}
    </Container>
  )
}

export default SAViewUser
