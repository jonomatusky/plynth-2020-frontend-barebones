import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'

import FormLayout from '../../shared/layouts/FormLayout'
import ContactSupportForm from '../components/ContactSupportForm'
import Background from '../../shared/layouts/Background'

import MessageBar from '../../shared/components/notifications/MessageBar'

import { BarRow } from '../../shared/components/ui/CardSections'

const SignUp = () => {
  const history = useHistory()
  const [message, setMessage] = useState()

  const handleSubmit = (values, response) => {
    setMessage(response.message)
  }

  return (
    <>
      <Background />
      <MessageBar
        open={!!message}
        message={message}
        handleClose={() => setMessage(null)}
      />
      <FormLayout
        title="Contact Support"
        message={
          <>
            Get help or report a bug by submitting the form below.
            <br />
            For immediate assistance, contact us at help@plynth.com or call or
            text (484) 297-9919.
          </>
        }
        bar={
          <BarRow
            onClick={() => {
              history.push('/')
            }}
            buttonLabel={'Cancel X'}
          />
        }
      >
        <ContactSupportForm onSubmit={handleSubmit} />
      </FormLayout>
    </>
  )
}

export default SignUp
