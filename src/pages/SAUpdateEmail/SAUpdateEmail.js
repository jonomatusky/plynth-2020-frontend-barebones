import React from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import { useAlertStore } from 'hooks/store/use-alert-store'
import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import { TextField } from 'components/FormElements'

// need to change loggedOut to auth instead of props
const UpdateEmail = () => {
  const { selectUser, updateStatus, updateUser } = useSAUsersStore()
  const { setMessage } = useAlertStore()
  const { username } = useParams()
  const user = selectUser(username)

  const initialValues = {
    email: (user || {}).email,
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please provide an email address')
      .required('Required'),
  })

  const handleSubmit = async (values, actions) => {
    try {
      console.log(values)
      await updateUser({ username, updates: values })
      setMessage({ message: 'Email address has been updated.' })
    } catch (err) {
      console.log(err)
      actions.resetForm()
    }
  }

  return (
    <FormLayout
      title="Email Preferences"
      message={`Update their email address.`}
    >
      <SimpleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        confirmationMessage={'Email address has been updated.'}
        status={updateStatus}
      >
        <TextField name="email" label="Email" type="email" />
      </SimpleForm>
    </FormLayout>
  )
}

export default UpdateEmail
