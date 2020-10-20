import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useThunkClient } from '../../shared/hooks/thunk-hook'
import { updateUser } from '../../redux/authSlice'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import EmailForm from '../components/UpdateEmailForm'

// need to change loggedOut to auth instead of props
const UpdateEmail = () => {
  const dispatchThunk = useThunkClient()
  const { user, updateStatus } = useSelector(state => state.auth)
  const history = useHistory()

  const handleSubmit = async ({ values, resetForm }) => {
    try {
      await dispatchThunk({
        thunk: updateUser,
        input: { updates: values },
      })
      history.push({
        pathname: '/admin/profile',
        state: { message: 'Email successfully updated.' },
      })
    } catch (err) {
      console.log(err)
      resetForm()
    }
  }

  return (
    <>
      <Background />
      <FormLayout
        title="Email Preferences"
        message={`Update your email address.`}
      >
        <EmailForm
          email={(user || {}).email}
          onSubmit={handleSubmit}
          isLoading={updateStatus === 'loading'}
        />
      </FormLayout>
    </>
  )
}

export default UpdateEmail
