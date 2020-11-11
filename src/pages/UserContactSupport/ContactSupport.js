import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import FormLayout from 'layouts/FormLayout'
import ContactSupportForm from './components/ContactSupportForm'

import MessageBar from 'components/MessageBar'

import { BarRow } from 'components/CardSections'

const SignUp = () => {
  const history = useHistory()
  const [message, setMessage] = useState()

  const handleSubmit = (values, response) => {
    setMessage(response.message)
    history.goBack()
  }

  return (
    <>
      <MessageBar
        open={!!message}
        message={message}
        handleClose={() => setMessage(null)}
      />
      <FormLayout
        title="Contact Support"
        message={
          <>
            Get help or report a bug by submitting the form below. For immediate
            assistance, contact us at help@plynth.com, or call or text us at
            (484) 297-9919.
          </>
        }
        bar={
          <BarRow
            onClick={() => {
              history.push('/admin/profile')
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
