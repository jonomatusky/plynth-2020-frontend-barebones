import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useApiClient } from 'hooks/api-hook'
import { setMessage, setError } from 'redux/alertSlice'
import FormLayout from 'layouts/FormLayout'
import SetPasswordForm from './components/UpdatePasswordForm'

const ChangePassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { isLoading, sendRequest } = useApiClient()

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
        dispatch(setError({ message: err.message }))
        resetForm()
      }
    }
  }

  return (
    <FormLayout title="Change Password">
      <SetPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />
    </FormLayout>
  )
}

export default ChangePassword
