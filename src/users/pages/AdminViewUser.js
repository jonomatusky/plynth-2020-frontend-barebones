import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Typography,
} from '@material-ui/core'

import Background from '../../shared/layouts/Background'
import PageTitle from '../../shared/components/ui/PageTitle'
import {
  PieceBox,
  ProfileTopRow,
  CardRow,
  PieceTitle,
  DescriptionBox,
  DescriptionText,
  LinkRow,
  BottomRow,
  UnstyledLink,
  BarRow,
} from '../../shared/components/ui/CardSections'
import SettingsIcon from '@material-ui/icons/Settings'
import MessageBar from '../../shared/components/notifications/MessageBar'
import ActionButton from '../../shared/components/ui/ActionButton'
import PieceList from '../../pieces/components/PieceList'

const title = 'User Profile'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const MyProfile = props => {
  const { users } = useSelector(state => state.users)
  const { pieces } = useSelector(state => state.pieces)
  const { username } = useParams()
  const history = useHistory()
  const [user, setUser] = useState()

  const classes = useStyles()
  const [message, setMessage] = useState((props.location.state || {}).message)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    if (users && username) {
      const currentUser = (users || []).find(user => user.username === username)
      setUser(currentUser)
    }
  }, [username, users])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClosePage = event => {
    const { referrer } = props.location.state || {}
    console.log(referrer)
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
        <PageTitle title={title}>
          <Button onClick={handleClick} endIcon={<SettingsIcon />}>
            Settings
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={'/admin/profile/email/change'}>
              Email Preferences
            </MenuItem>
            <MenuItem component={Link} to={'/admin/profile/password/change'}>
              Reset Password
            </MenuItem>
            <MenuItem component={Link} to={'/admin/logout'}>
              Logout
            </MenuItem>
          </Menu>
        </PageTitle>

        {!!user && (
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
                    <Box textAlign="left" padding={1} overflow="hidden">
                      <PieceTitle variant="h5">{user.displayName}</PieceTitle>
                      <Typography variant="body2">
                        <UnstyledLink
                          to={`/${user.username}`}
                        >{`plynth.com/${user.username}`}</UnstyledLink>
                      </Typography>
                      <Typography variant="body2">
                        {`@${user.username} `}
                        <UnstyledLink
                          textDecoration="underline"
                          to={`/admin/profile/username/change`}
                        >
                          edit
                        </UnstyledLink>
                      </Typography>
                      <Typography variant="body2"></Typography>
                    </Box>
                  </Grid>
                </ProfileTopRow>
                {user.bio && (
                  <>
                    <CardRow container justify="center">
                      <DescriptionBox item xs={11}>
                        <DescriptionText>{user.bio}</DescriptionText>
                      </DescriptionBox>
                    </CardRow>
                    <Box height="1rem"></Box>
                  </>
                )}
                <BottomRow container justify="center">
                  <Grid>
                    <Button
                      color="inherit"
                      component={Link}
                      to={`/admin/${user.username}/edit`}
                    >
                      Edit User
                    </Button>
                  </Grid>
                </BottomRow>
              </React.Fragment>
            </PieceBox>
            <Box height="1rem"></Box>
            <Grid item>
              <Typography variant="h5">User Pieces</Typography>
            </Grid>
            <Box height="1rem"></Box>
            <Grid item>
              {pieces && user && (
                <PieceList
                  items={pieces.filter(
                    piece => piece.owner.username === user.username
                  )}
                />
              )}
            </Grid>
            <Box height="1rem"></Box>
          </Grid>
        )}
      </Container>
    </React.Fragment>
  )
}

export default MyProfile
