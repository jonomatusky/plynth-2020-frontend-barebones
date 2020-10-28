import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container } from '@material-ui/core'

import { deleteUser } from '../../redux/usersSlice'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import RemoveUserForm from '../components/RemoveUserForm'
import { useThunkClient } from '../../shared/hooks/thunk-hook'
import { setMessage } from '../../redux/alertSlice'

// need to change loggedOut to auth instead of props
const RemoveUser = () => {
  const dispatchThunk = useThunkClient()
  const { username } = useParams() || {}
  const history = useHistory()

  const handleSubmit = async values => {
    delete values.passwordConfirmation

    try {
      if (username === values.username) {
        await dispatchThunk({ thunk: deleteUser, inputs: { username } })
        dispatchEvent(setMessage({ message: 'User has been deleted' }))
      }
    } catch (err) {
      console.log(err)
    }

    history.push('/admin/users')
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <FormLayout
          title="Delete User"
          message={
            <>
              Are you sure you want to delete this user? Their pieces will be
              archived and reassigned to USER_REMOVED. This action cannot be
              undone.
              <br />
              <br />
              If you're sure you want to delete this user, please type their
              username, {username}, to confirm.
            </>
          }
        >
          <RemoveUserForm username={username} onSubmit={handleSubmit} />
        </FormLayout>
      </Container>
    </React.Fragment>
  )
}

export default RemoveUser
