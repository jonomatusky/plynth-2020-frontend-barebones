import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { useRequest } from 'hooks/use-request'
import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import { TextField, TextArea } from 'components/FormElements'

const SignUp = () => {
  const { status, request } = useRequest()
  const history = useHistory()

  const confirmationMessage = `Thanks for contacting support. We'll get back to you shortly.`

  const handleSubmit = async values => {
    try {
      const data = { message: { ...values, type: 'support' } }

      await request({
        url: `/messages`,
        method: 'POST',
        data,
      })
    } catch (err) {}
  }

  const handleClose = () => {
    history.push('/admin/profile')
  }

  const initialValues = {
    subject: '',
    content: '',
  }

  const validationSchema = Yup.object({
    subject: Yup.string(),
    content: Yup.string(),
  })

  return (
    <>
      <FormLayout
        title="Contact Support"
        message={
          <>
            Get help or report a bug by submitting the form below. For immediate
            assistance, contact us at help@plynth.com, or call or text us at
            (484) 297-9919.
          </>
        }
      >
        <SimpleForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          initialValues={initialValues}
          validationSchema={validationSchema}
          confirmationMessage={confirmationMessage}
          status={status}
        >
          <TextField name="subject" label="Subject" />

          <TextArea name="content" label="Message" />
        </SimpleForm>
      </FormLayout>
    </>
  )
}

export default SignUp
