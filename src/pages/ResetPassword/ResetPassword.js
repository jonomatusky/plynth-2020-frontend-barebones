import React, { useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { AuthContext } from 'contexts/auth-context'
import { useRequest } from 'hooks/use-request'

import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import { TextField } from 'components/FormElements'

const ChangePassword = () => {
  const auth = useContext(AuthContext)
  const { token, userId } = useParams()
  const { status, request } = useRequest()
  const history = useHistory()

  const handleSubmit = async (values, action) => {
    const body = { password: values.newPassword, token, id: userId }

    if (status !== 'loading') {
      try {
        await request({ url: `/auth/reset`, method: 'POST', data: body })
        action.resetForm()
      } catch (err) {}
    }
  }

  const handleClose = () => {
    history.push('/admin/login')
  }

  const initialValues = {
    newPassword: '',
    passwordConfirmation: '',
  }

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(5, 'Password must be at least 5 characters long')
      .required('Required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required'),
  })

  useEffect(() => {
    if (!token) {
      history.push('/')
    }
  })

  useEffect(() => {
    auth.logout()
  }, [auth])

  return (
    <React.Fragment>
      {
        <FormLayout
          title="Reset Password"
          message={`Enter your new password below.`}
          onClose={handleClose}
        >
          <SimpleForm
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            status={status}
            confirmationMessage="Your password has been reset. Please log in."
            onClose={handleClose}
          >
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
            />

            <TextField
              name="passwordConfirmation"
              label="Confirm New Password"
              type="password"
            />
          </SimpleForm>
        </FormLayout>
      }
    </React.Fragment>
  )
}

export default ChangePassword
