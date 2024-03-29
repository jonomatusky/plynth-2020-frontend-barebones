import React from 'react'
import * as Yup from 'yup'

import { useUserStore } from 'hooks/store/use-user-store'
import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import { TextField } from 'components/FormElements'
import { useAlertStore } from 'hooks/store/use-alert-store'

// need to change loggedOut to auth instead of props
const UpdateEmail = () => {
  const { user, updateStatus, updateUser } = useUserStore()
  const { setMessage } = useAlertStore()

  const initialValues = {
    email: user.email || '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please provide your email address')
      .required('Required'),
  })

  const handleSubmit = async (values, actions) => {
    try {
      await updateUser(values)
      setMessage({ message: 'Your email has been updated.' })
    } catch (err) {
      console.log(err)
      actions.resetForm()
    }
  }

  return (
    <FormLayout
      title="Email Preferences"
      message={`Update your email address.`}
    >
      <SimpleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        confirmationMessage={'Your email has been updated.'}
        status={updateStatus}
      >
        <TextField name="email" label="Email" type="email" />
      </SimpleForm>
    </FormLayout>
  )
}

export default UpdateEmail
