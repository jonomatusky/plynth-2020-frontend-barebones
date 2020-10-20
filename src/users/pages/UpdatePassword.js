import React from 'react'
import { useHistory } from 'react-router-dom'

import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import SetPasswordForm from '../components/UpdatePasswordForm'

const ChangePassword = () => {
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async (values, resetForm) => {
    let { passwordConfirmation, ...passwords } = values

    if (!isLoading) {
      try {
        await sendRequest({
          url: `/auth/password`,
          method: 'PATCH',
          data: { passwords },
        })

        history.push('/admin/profile')
      } catch (err) {
        resetForm()
      }
    }
  }

  return (
    <React.Fragment>
      <Background />
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <FormLayout title="Change Password">
        <SetPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />
      </FormLayout>
    </React.Fragment>
  )
}

export default ChangePassword
