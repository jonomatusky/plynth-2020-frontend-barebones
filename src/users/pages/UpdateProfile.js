import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { AuthContext } from '../../shared/context/auth-context'
import { useApiClient } from '../../shared/hooks/api-hook'

import ErrorBar from '../../shared/components/notifications/ErrorBar'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import { TextField, TextArea } from '../../shared/components/forms/FormElements'
import AvatarInput from '../components/AvatarInput'
import LinkList from '../../shared/components/forms/LinkList'
import ActionButton from '../../shared/components/ui/ActionButton'

const UpdateProfile = props => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    try {
      const userData = { user: values }
      const response = await sendRequest(`/users/me`, 'PATCH', userData)
      auth.updateUser(response.user)
      props.onSubmit(values)
    } catch (err) {}
    history.push('/admin/profile')
  }

  const user = auth.user

  const { username, displayName, bio, links, avatar, avatarLink } = user

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
      <Background />
      <FormLayout>
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
                <Grid item>
                  <LinkList links={values.links} />
                </Grid>
                <Grid item>
                  <ActionButton
                    type="submit"
                    label="Save"
                    loading={isLoading}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </FormLayout>
    </>
  )
}

export default UpdateProfile
