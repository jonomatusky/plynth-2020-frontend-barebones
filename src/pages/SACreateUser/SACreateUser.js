import React from 'react'
import { useHistory } from 'react-router-dom'

import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import { useAlertStore } from 'hooks/store/use-alert-store'

import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import { TextField } from 'components/FormElements'

const SACreateUser = () => {
  const history = useHistory()
  const { createUser, createStatus } = useSAUsersStore()
  const { setMessage } = useAlertStore()

  const initialValues = {
    username: '',
  }

  const handleSubmit = async values => {
    try {
      await createUser(values)
      setMessage({ message: 'User created.' })
      history.push(`/superadmin/users/${values.username}/edit`)
    } catch (err) {}
  }

  return (
    <FormLayout
      title="New User"
      message="Start creating a new user by entering a username."
    >
      <SimpleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        status={createStatus}
      >
        <TextField name="username" label="Username" />
      </SimpleForm>
    </FormLayout>
  )
}

export default SACreateUser
