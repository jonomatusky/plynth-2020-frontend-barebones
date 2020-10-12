import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from '../../shared/hooks/api-hook'
import { setUser } from '../../redux/authSlice'

import ErrorBar from '../../shared/components/notifications/ErrorBar'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import { TextField, TextArea } from '../../shared/components/forms/FormElements'
import AvatarInput from '../components/AvatarInput'
import LinkList from '../../shared/components/forms/LinkList'
import ActionButton from '../../shared/components/ui/ActionButton'

const UpdateProfile = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector(state => state.auth)
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    try {
      const userData = { user: values }
      const response = await sendRequest(`/users/me`, 'PATCH', userData)
      dispatch(setUser(response))
      props.onSubmit(values)
    } catch (err) {}
    history.push('/admin/profile')
  }

  const { displayName, bio, links, avatar, avatarLink } = user

  const initialValues = {
    displayName: displayName || '',
    bio: bio || '',
    avatar: avatar || null,
    links,
  }

  const validationSchema = Yup.object({
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
          {({ values, setFieldValue }) => (
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
                  <TextArea name="bio" label="Bio" />
                </Grid>
                <Box height="1rem"></Box>
                <Grid item>
                  <LinkList links={values.links} />
                </Grid>
                <Box height="1rem"></Box>
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
