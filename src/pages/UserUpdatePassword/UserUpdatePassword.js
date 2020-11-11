import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useApiClient } from 'hooks/api-hook'
import { setMessage } from 'redux/alertSlice'
import ErrorBar from 'components/ErrorBar'
import Background from 'layouts/Background'
import FormLayout from 'layouts/FormLayout'
import SetPasswordForm from './components/UpdatePasswordForm'

const ChangePassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()
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
        dispatch(setMessage({ message: 'Your password has been updated.' }))
        history.goBack()
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
