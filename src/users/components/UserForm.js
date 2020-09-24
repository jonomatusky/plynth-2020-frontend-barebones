import React, { useState, useEffect } from 'react'
// import { useForm, Controller } from 'react-hook-form'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'

import {
  TextField,
  FieldSet,
  LinkBarRow,
  TextArea,
} from '../../shared/components/forms/FormElements'

import AvatarInput from './AvatarInput'

import ErrorBar from '../../shared/components/notifications/ErrorBar'
import ActionButton from '../../shared/components/ui/ActionButton'
import { useApiClient } from '../../shared/hooks/api-hook'

const UserForm = props => {
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    try {
      const userData = { user: values }
      const response = await sendRequest(
        `/users/me`,
        'PATCH',
        JSON.stringify(userData)
      )
      auth.updateUser(response.user)
      props.onSubmit(values)
    } catch (err) {}
    history.push('/admin/profile')
  }

  const { username, displayName, bio, links, avatar, avatarLink } = props.user

  const initialValues = {
    username: username || '',
    displayName: displayName || '',
    bio: bio || '',
    avatar: avatar || null,
    links,
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
    displayName: Yup.string()
      .max(30, 'Enter a name under 30 characters')
      .required('Required'),
    avatar: Yup.string(),
    bio: Yup.string(),
    links: Yup.array().of(
      Yup.object({
        name: Yup.string()
          .max(32, 'Must be 32 characters or less')
          .required('Required'),
        url: Yup.string().url('Must be a valid URL').required('Required'),
      })
    ),
  })

  return (
    <>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isValid, setFieldValue }) => (
          <Form>
            <Grid container direction="column" spacing={1}>
              <Box height="1rem"></Box>
              <Grid item>
                <AvatarInput
                  imageUrl={avatarLink || undefined}
                  onInput={avatar => {
                    setFieldValue('avatar', avatar)
                  }}
                />
              </Grid>
              <Grid item>
                <TextField name="displayName" label="Name" />
              </Grid>
              <Grid item>
                <TextField name="username" label="Username" />
              </Grid>
              <Grid item>
                <TextArea name="bio" label="Bio" />
              </Grid>
              <FieldArray name="links">
                {({ insert, remove, push }) => (
                  <React.Fragment>
                    <Grid item>
                      {(values.links || []).map((link, index) => (
                        <FieldSet container direction="column" key={index}>
                          <LinkBarRow
                            title="Link"
                            buttonLabel="Remove X"
                            onClick={() => remove(index)}
                          />
                          <Grid container justify="center">
                            <Grid item xs={11}>
                              <Grid container direction="column" spacing={1}>
                                <Box height="1rem" />
                                <Grid item>
                                  <TextField
                                    label="URL"
                                    name={`links.${index}.url`}
                                    type="url"
                                  />
                                </Grid>
                                <Grid item>
                                  <TextField
                                    name={`links.${index}.name`}
                                    label="Link Text"
                                    type="text"
                                  />
                                </Grid>
                                <Box height="1rem" />
                              </Grid>
                            </Grid>
                          </Grid>
                        </FieldSet>
                      ))}
                      <ActionButton
                        type="button"
                        onClick={() => push({ name: '', url: '' })}
                        label="+ Add A Link"
                        variant="text"
                      />
                    </Grid>
                  </React.Fragment>
                )}
              </FieldArray>
              <Grid item>
                <ActionButton type="submit" label="Save" loading={isLoading} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default UserForm
