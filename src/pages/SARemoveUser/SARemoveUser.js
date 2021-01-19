import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container } from '@material-ui/core'

import Background from 'layouts/Background'
import FormLayout from 'layouts/FormLayout'
import RemoveUserForm from './components/RemoveUserForm'
import { useAlertStore } from 'hooks/store/use-alert-store'
import { useSAUsersStore } from 'hooks/store/use-sa-users-store'

// need to change loggedOut to auth instead of props
const RemoveUser = () => {
  const { setMessage } = useAlertStore()
  const { deleteUser } = useSAUsersStore()
  const { username } = useParams() || {}
  const history = useHistory()

  const handleSubmit = async values => {
    delete values.passwordConfirmation

    try {
      if (username === values.username) {
        await deleteUser(username)
        setMessage({ message: 'User has been deleted' })
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
