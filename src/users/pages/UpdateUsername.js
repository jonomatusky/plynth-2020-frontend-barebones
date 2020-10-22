import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { useThunkClient } from '../../shared/hooks/thunk-hook'
import { updateUser } from '../../redux/userSlice'
import { setMessage } from '../../redux/alertSlice'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import UsernameForm from '../components/UpdateUsernameForm'

// need to change loggedOut to auth instead of props
const ChangeUsername = () => {
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
      dispatch(setMessage({ message: 'Username successfully updated.' }))
      history.goBack()
    } catch (err) {
      console.log(err)
      resetForm()
    }
  }

  return (
    <React.Fragment>
      <Background />
      <FormLayout
        title="Change Username"
        message={
          <>
            Are you sure you want to change your username? Links to your old
            profile will <strong>not</strong> be forwarded automatically. You
            may not be able to change your username back.
            <br />
            <br />
            Usernames must be between 6 and 30 characters and can only contain
            numbers, letters, "." and "_".
          </>
        }
      >
        <UsernameForm
          username={user.username}
          onSubmit={handleSubmit}
          isLoading={updateStatus === 'loading'}
        />
      </FormLayout>
    </React.Fragment>
  )
}

export default ChangeUsername
