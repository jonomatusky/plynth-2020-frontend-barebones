import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'

import { useUserStore } from 'hooks/store/use-user-store'
import { useAlertStore } from 'hooks/store/use-alert-store'
import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import { TextField } from 'components/FormElements'

const ChangeUsername = () => {
  const { user, status, updateStatus, updateUser } = useUserStore()
  const { setMessage } = useAlertStore()
  const [initialValues, setInitialValues] = useState({
    username: '',
  })

  useEffect(() => {
    if (status === 'succeeded') {
      setInitialValues({
        username: user.username,
      })
    }
  }, [status, user.username])

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
      await updateUser({ ...values })
      setMessage({ message: 'Your username has been updated.' })
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
          Are you sure you want to change your username? Links to your old
          profile will <strong>not</strong> be forwarded automatically. You may
          not be able to change your username back.
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
