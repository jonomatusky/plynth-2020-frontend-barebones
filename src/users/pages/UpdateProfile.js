import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import { Container, Grid, Box } from '@material-ui/core'
import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'

import { AuthContext } from '../../shared/context/auth-context'
import { useApiClient } from '../../shared/hooks/api-hook'
import UserForm from '../components/UserForm'

import Background from '../../shared/layouts/Background'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const MyProfile = () => {
  const auth = useContext(AuthContext)
  const classes = useStyles()
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  // const [user, setUser] = useState()
  const history = useHistory()

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const responseData = await sendRequest(`/users/me`)
  //       setUser(responseData.user)
  //     } catch (err) {}
  //   }
  //   fetchUser()
  // }, [sendRequest])

  let user = auth.user

  const handleSubmit = async values => {
    try {
      const userData = { user: values }
      const response = await sendRequest(
        `/users/me`,
        'PATCH',
        JSON.stringify(userData)
      )
      auth.updateUser(response.user)
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
            <Box height="4vh"></Box>
            <PieceBox container direction="column">
              <BarRow
                title="Edit My Profile"
                onClick={handleCancel}
                buttonLabel={'Cancel X'}
              />
              <Grid item>
                <UserForm user={user} onSubmit={handleSubmit} />
              </Grid>
              <Box height="4vh"></Box>
            </PieceBox>
            <Box height="4vh"></Box>
          </Grid>
        )}
      </Container>
    </React.Fragment>
  )
}

export default MyProfile
