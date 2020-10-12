import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'

import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import SetPasswordForm from '../components/SetPasswordForm'

// need to change loggedOut to auth instead of props
const ChangePassword = () => {
  const history = useHistory()

  const handleSubmit = () => {
    history.push({
      pathname: '/admin/profile',
      state: { message: 'Password successfully updated.' },
    })
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <FormLayout title="Change Username">
          <SetPasswordForm onSubmit={handleSubmit} />
        </FormLayout>
      </Container>
    </React.Fragment>
  )
}

export default ChangePassword
