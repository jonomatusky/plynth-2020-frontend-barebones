import React from 'react'
import { useHistory } from 'react-router-dom'

import FormLayout from 'layouts/FormLayout'
import EmailSignupForm from 'components/EmailSignupForm'

const BetaSignup = () => {
  const history = useHistory()

  const handleClose = () => {
    history.push('/')
  }

  return (
    <FormLayout
      title="Sign Up"
      message={`Sign up to get the latest updates from the Plynth team.`}
      onClose={handleClose}
    >
      <EmailSignupForm />
    </FormLayout>
  )
}

export default BetaSignup
