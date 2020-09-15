import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import { Container, Grid, Box } from '@material-ui/core'
import {
  PieceBox,
  BarRow,
} from '../../shared/components/UIElements/CardSections'
import SettingsIcon from '@material-ui/icons/Settings'

import { useApiClient } from '../../shared/hooks/api-hook'
import UserForm from '../components/UserForm'
import PieceForm from '../../pieces/components/PieceForm'

import ErrorBar from '../../shared/components/UIElements/ErrorBar'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Background from '../../shared/components/UIElements/Background'
import PageTitle from '../../shared/components/UIElements/PageTitle'

import LoadingGraphic from '../../shared/components/UIElements/LoadingGraphic'

const title = 'Edit My Profile'

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
  const history = useHistory()

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
    } catch (err) {}
    history.push('/admin/profile')
  }

  const handleCancel = () => {
    history.push('/admin/profile')
  }

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />
      <Container maxWidth="sm">
        {isLoading && <LoadingSpinner asOverlay />}
        {user && !isLoading && (
          <Grid container justify="flex-start" direction="column">
            <PageTitle title={title} />
            <PieceBox container direction="column">
              <BarRow onClick={handleCancel} buttonLabel={'Cancel X'} />
              <Grid item>
                <UserForm user={user} onSubmit={handleSubmit} />
              </Grid>
              <Box height="4vh"></Box>
            </PieceBox>
            <Box height="10vh"></Box>
          </Grid>
        )}
      </Container>
    </React.Fragment>
  )
}

export default MyProfile
