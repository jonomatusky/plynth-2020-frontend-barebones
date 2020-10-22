import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useThunkClient } from '../../shared/hooks/thunk-hook'
import { updateUser } from '../../redux/userSlice'
import { setMessage } from '../../redux/alertSlice'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import EmailForm from '../components/UpdateEmailForm'

// need to change loggedOut to auth instead of props
const UpdateEmail = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunkClient()
  const { user, updateStatus } = useSelector(state => state.user)
  const history = useHistory()

  const handleSubmit = async ({ values, resetForm }) => {
    try {
      await dispatchThunk({
        thunk: updateUser,
        inputs: values,
      })
      dispatch(setMessage({ message: 'Your email has been updated.' }))
      history.goBack()
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
          email={user.email}
          onSubmit={handleSubmit}
          isLoading={updateStatus === 'loading'}
        />
      </FormLayout>
    </>
  )
}

export default UpdateEmail
