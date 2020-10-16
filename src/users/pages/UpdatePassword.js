import React from 'react'
import { useHistory } from 'react-router-dom'

import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import SetPasswordForm from '../components/UpdatePasswordForm'

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
      <FormLayout title="Change Password">
        <SetPasswordForm onSubmit={handleSubmit} />
      </FormLayout>
    </React.Fragment>
  )
}

export default ChangePassword
