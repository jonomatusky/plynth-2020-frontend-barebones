import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import { TextField, TextArea } from '../../shared/components/forms/FormElements'
import AvatarInput from './AvatarInput'
import LinksList from '../../shared/components/forms/LinkList'
import ActionButton from '../../shared/components/ui/ActionButton'

const UserForm = props => {
  // eslint-disable-next-line no-unused-vars
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    // try {
    //   const userData = { user: values }
    //   const response = await sendRequest(
    //     `/users/me`,
    //     'PATCH',
    //     userData
    //   )
    //   auth.updateUser(response.user)
    //   props.onSubmit(values)
    // } catch (err) {}
    // history.push('/admin/profile')
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
        url: Yup.string()
          .url(`Must be a valid URL. Include http:// or https://`)
          .required('Required'),
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
                <TextField
                  name="username"
                  label={`Username (plynth.com/${
                    values.username || 'username'
                  })`}
                  autoCapitalize="none"
                />
              </Grid>
              <Grid item>
                <TextArea name="bio" label="Bio" />
              </Grid>
              <Grid item>
                <LinksList links={values.links} />
              </Grid>
              <Box height="1rem"></Box>
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
