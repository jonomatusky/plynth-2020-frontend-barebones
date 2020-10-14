import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container } from '@material-ui/core'

import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import RemoveUserForm from '../components/RemoveUserForm'

// need to change loggedOut to auth instead of props
const RemoveUser = () => {
  const { username } = useParams() || {}
  const history = useHistory()

  const handleSubmit = () => {
    history.push({
      pathname: '/admin/users',
      state: { message: 'User successfully removed.' },
    })
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <FormLayout
          title="Change Username"
          message={
            <>
              Are you sure you want to delete this user? Their pieces will be
              archived and reassigned to USER_REMOVED. This action cannot be
              undone (easily).
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
