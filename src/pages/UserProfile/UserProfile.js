import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

import { AuthContext } from 'contexts/auth-context'
import MessageBar from 'components/MessageBar'
import PageTitle from 'components/PageTitle'
import { UnstyledLink } from 'components/CardSections'
import useUserStore from 'hooks/store/use-user-store'
import UserCard from 'components/UserCard'

const title = 'My Profile'

const MyProfile = props => {
  const auth = useContext(AuthContext)
  // const { user } = useSelector(state => state.user)
  const { user, status } = useUserStore()
  const [message, setMessage] = useState((props.location.state || {}).message)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    auth.logout()
  }

  return (
    <React.Fragment>
      <MessageBar
        open={!!message}
        message={message}
        handleClose={() => setMessage(null)}
      />
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
            <MenuItem component={Link} to={'/admin/profile/help'}>
              Help
            </MenuItem>
            <MenuItem component={Link} to={'/admin/profile/email/change'}>
              Email Preferences
            </MenuItem>
            <MenuItem component={Link} to={'/admin/profile/password/change'}>
              Change Password
            </MenuItem>
            <MenuItem component={Link} to={'/admin/recover'}>
              Forgot Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
          </Menu>
        </PageTitle>
        <Grid container justify="flex-start" direction="column">
          {!!user && status === 'succeeded' && (
            <UserCard
              user={user}
              subtitle={
                <>
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
                      change
                    </UnstyledLink>
                  </Typography>
                  <Typography variant="body2">
                    <UnstyledLink
                      textDecoration="underline"
                      to={`/admin/profile/edit`}
                    >
                      Edit Profile
                    </UnstyledLink>
                  </Typography>
                </>
              }
            />
          )}
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
                    to={`/admin/profile/edit`}
                    fullWidth
                    color="secondary"
                  >
                    Edit Profile
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box height="1rem"></Box>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default MyProfile
