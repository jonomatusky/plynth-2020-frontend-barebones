import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import { AuthContext } from '../../shared/context/auth-context'
import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import UserForm from '../components/UserForm'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

const MyProfile = () => {
  const auth = useContext(AuthContext)
  let user = auth.user
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

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

  return (
    <>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />
      {isLoading && <LoadingSpinner asOverlay />}
      {user && !isLoading && (
        <FormLayout>
          <UserForm user={user} onSubmit={handleSubmit} />
        </FormLayout>
      )}
    </>
  )
}

export default MyProfile
