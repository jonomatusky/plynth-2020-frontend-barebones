import React from 'react'
import * as Yup from 'yup'

import { useRequest } from 'hooks/use-request'
import FormLayout from 'layouts/FormLayout'
import { TextField } from 'components/FormElements'

import SimpleForm from 'components/SimpleForm'
import { useHistory } from 'react-router-dom'

const ChangePassword = () => {
  const { status, request } = useRequest()
  const history = useHistory()

  const handleSubmit = async (values, actions) => {
    let { passwordConfirmation, ...passwords } = values

    try {
      await request({
        url: `/auth/password`,
        method: 'PATCH',
        data: { passwords },
      })
    } catch (err) {}
  }

  const handleClose = () => {
    history.push('/admin/profile')
  }

  const initialValues = {
    password: '',
    newPassword: '',
    passwordConfirmation: '',
  }

  const validationSchema = Yup.object({
    password: Yup.string().required('Required'),
    newPassword: Yup.string()
      .min(5, 'Password must be at least 5 characters long')
      .required('Required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required'),
  })

  return (
    <FormLayout title="Change Password" onClose={handleClose}>
      <SimpleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        status={status}
        confirmationMessage={`Your password has been updated.`}
        onClose={handleClose}
      >
        <TextField name="password" label="Current Password" type="password" />
        <TextField name="newPassword" label="New Password" type="password" />
        <TextField
          name="passwordConfirmation"
          label="Confirm New Password"
          type="password"
        />
      </SimpleForm>
    </FormLayout>
  )
}

export default ChangePassword
