import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'

import FormLayout from '../../shared/layouts/FormLayout'
import Background from '../../shared/layouts/Background'
import UsernameForm from '../components/UsernameForm'

// need to change loggedOut to auth instead of props
const ChangeUsername = () => {
  const { user } = useSelector(state => state.auth)
  const history = useHistory()

  const handleSubmit = () => {
    history.push({
      pathname: '/admin/profile',
      state: { message: 'Username successfully updated.' },
    })
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <FormLayout
          title="Change Username"
          message={`Are you sure you want to change your username? Links to your old
          profile will <strong>not</strong> be forwarded automatically. You
          may not be able to change your username back. Usernames must be
          between 6 and 30 characters and can only contain numbers, letters,
          "." and "_".`}
        >
          <UsernameForm user={user} onSubmit={handleSubmit} />
        </FormLayout>
      </Container>
    </React.Fragment>
  )
}

export default ChangeUsername
