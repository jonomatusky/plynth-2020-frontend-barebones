import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context'
import { makeStyles } from '@material-ui/core/styles'

import {
  Container,
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from '@material-ui/core'
import {
  PieceBox,
  BarRow,
  ProfileTopRow,
  CardRow,
  PieceTitle,
  DescriptionBox,
  DescriptionText,
  LinkRow,
  BottomRow,
} from '../../shared/components/UIElements/CardSections'
import SettingsIcon from '@material-ui/icons/Settings'

import { useApiClient } from '../../shared/hooks/api-hook'
import UserForm from '../components/UserForm'

import ErrorBar from '../../shared/components/UIElements/ErrorBar'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Background from '../../shared/components/UIElements/Background'
import PageTitle from '../../shared/components/UIElements/PageTitle'

import LoadingGraphic from '../../shared/components/UIElements/LoadingGraphic'

const title = 'My Profile'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const MyProfile = () => {
  const classes = useStyles()
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const [user, setUser] = useState()
  const [editMode, setEditMode] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(`/users/me`)
        setUser(responseData.user)
      } catch (err) {}
    }
    fetchUser()
  }, [sendRequest])

  const handleSubmit = async values => {
    try {
      const userData = { user: values }
      await sendRequest(`/users/me`, 'PATCH', JSON.stringify(userData))
      setEditMode(false)
    } catch (err) {}
  }

  const handleCancel = event => {
    setEditMode(false)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />
      <Container maxWidth="sm">
        {isLoading && <LoadingSpinner asOverlay />}
        {user && !isLoading && (
          <React.Fragment>
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
                <MenuItem
                  component={Link}
                  to={'/admin/profile/password/change'}
                >
                  Change Password
                </MenuItem>
                <MenuItem component={Link} to={'/admin/logout'}>
                  Logout
                </MenuItem>
              </Menu>
            </PageTitle>
            <Grid container justify="flex-start" direction="column">
              <Box height="5vh"></Box>
              <PieceBox container direction="column">
                {!editMode && (
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
                            {user.avatar && (
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
                          <PieceTitle variant="h5">
                            {user.displayName}
                          </PieceTitle>
                        </Box>
                      </Grid>
                    </ProfileTopRow>
                    <CardRow container justify="center">
                      <DescriptionBox item xs={11}>
                        <DescriptionText>{user.bio}</DescriptionText>
                      </DescriptionBox>
                    </CardRow>
                    {user.links.map(link => {
                      return (
                        <LinkRow container key={link._id} justify="center">
                          <Grid item xs={11}>
                            <ActionButton
                              target="_blank"
                              href={link.url}
                              label={link.name}
                            />
                          </Grid>
                        </LinkRow>
                      )
                    })}
                    <Box height="4vh"></Box>
                    <BottomRow container justify="center">
                      <Grid>
                        <Button color="inherit" onClick={setEditMode}>
                          Edit My Profile
                        </Button>
                      </Grid>
                    </BottomRow>
                  </React.Fragment>
                )}
                {editMode && (
                  <Grid container direction="column" alignItems="center">
                    <BarRow onClick={handleCancel} buttonLabel="Cancel X" />
                    <Grid item xs={11}>
                      <Box height="0.75rem"></Box>
                      <UserForm
                        username={user.username}
                        onSubmit={handleSubmit}
                      />
                      <Box height="0.75rem"></Box>
                    </Grid>
                  </Grid>
                )}
              </PieceBox>
              <Box height="10vh"></Box>
            </Grid>
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  )
}

export default MyProfile
