import React from 'react'
import { useHistory } from 'react-router-dom'

import FormLayout from '../../shared/layouts/FormLayout'
import LoginForm from '../components/LoginForm'
import Background from '../../shared/layouts/Background'

import { BarRow } from '../../shared/components/ui/CardSections'

const SignUp = () => {
  const history = useHistory()

  return (
    <>
      <Background />
      <FormLayout
        title="Log In"
        bar={
          <BarRow
            onClick={() => {
              history.push('/')
            }}
            buttonLabel={'Cancel X'}
          />
        }
      >
        <LoginForm />
      </FormLayout>
    </>
  )
}

export default SignUp
