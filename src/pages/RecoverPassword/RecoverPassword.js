import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { useRequest } from 'hooks/use-request'
import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import { TextField } from 'components/FormElements'

const ChangePassword = () => {
  const { status, request } = useRequest()
  const history = useHistory()

  const handleSubmit = async values => {
    try {
      const data = { email: values.email }

      await request({
        url: `/auth/recover`,
        method: 'POST',
        data,
      })
    } catch (err) {}
  }

  const handleClose = () => {
    history.push('/')
  }

  const initialValues = {
    email: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please provide your email address')
      .required('Required'),
  })

  return (
    <FormLayout
      title="Forgot Your Password?"
      message={`Enter your email below and we will send you intructions on how to reset your password.`}
    >
      <SimpleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        confirmationMessage={`We've sent password reset intructions to the email provided. Please check your inbox.`}
        status={status}
        onClose={handleClose}
      >
        <TextField name="email" label="Email" type="email" />
      </SimpleForm>
    </FormLayout>
  )
}

export default ChangePassword
