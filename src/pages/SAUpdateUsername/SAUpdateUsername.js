import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import * as Yup from 'yup'

import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import { useAlertStore } from 'hooks/store/use-alert-store'
import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import { TextField } from 'components/FormElements'

const ChangeUsername = () => {
  const history = useHistory()
  const { updateStatus, updateUser } = useSAUsersStore()
  const { setMessage } = useAlertStore()
  const { username } = useParams()

  const initialValues = {
    username,
  }

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, 'Username must be at least 6 characters long')
      .max(30, 'Username must be no longer than 30 characters')
      .matches(
        /^[a-z0-9_.]*$/,
        'Username must only contain lowercase characters a-z, numbers, . and _'
      )
      .matches(
        /^(?!.*?\.\.).*?$/,
        'Username cannot contain two consecutive (.)'
      )
      .matches(/^((?!\.).*(?!\.))$/, 'Username cannot start or end with (.)')
      .required('Required'),
  })

  const handleSubmit = async (values, actions) => {
    try {
      await updateUser({ username, updates: values })
      setMessage({ message: 'The username has been updated.' })
      history.push(`/superadmin/users/${values.username}`)
    } catch (err) {
      console.log(err)
      actions.resetForm()
    }
  }

  return (
    <FormLayout
      title="Change Username"
      message={
        <>
          Are you sure you want to change this username? Links to the old
          profile will <strong>not</strong> be forwarded automatically. You may
          not be able to change the username back.
          <br />
          <br />
          Usernames must be between 6 and 30 characters and can only contain
          numbers, letters, "." and "_".
        </>
      }
    >
      <SimpleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        status={updateStatus}
      >
        <TextField name="username" label="Username" />
      </SimpleForm>
    </FormLayout>
  )
}

export default ChangeUsername
