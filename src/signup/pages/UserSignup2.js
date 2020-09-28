import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { AuthContext } from '../../shared/context/auth-context'
import { useApiClient } from '../../shared/hooks/api-hook'

import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import ActionButton from '../../shared/components/ui/ActionButton'
import AvatarInput from '../../users/components/AvatarInput'
import { BarRow } from '../../shared/components/ui/CardSections'
import { TextField, TextArea } from '../../shared/components/forms/FormElements'
import LinkList from '../../shared/components/forms/LinkList'

const title = 'Add Your Info'

const UserSignup2 = ({ values }) => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  let user = auth.user

  const initialValues = {
    avatar: user.avatar || '',
    displayName: user.displayName || '',
    bio: user.bio || '',
    links: user.links || [],
  }

  const validationSchema = Yup.object({
    avatar: Yup.string(),
    displayName: Yup.string()
      .max(30, 'Enter a name under 30 characters')
      .required('Required'),
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

  const handleSubmit = async values => {
    try {
      let userData = { user: values }
      const response = await sendRequest(`/users/me`, 'PATCH', userData)

      auth.updateUser(response.user)
      history.push('/admin/get-started/success')
    } catch (err) {}
  }

  const handleCancel = () => {
    history.push('/admin/get-started/success')
  }

  const onImageInput = ({ avatar, setFieldValue }) => {
    setFieldValue('avatar', avatar)
    console.log(avatar)
  }

  return (
    <>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />

      <FormLayout
        title={title}
        bar={<BarRow onClick={handleCancel} buttonLabel={'Skip >'} />}
      >
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
                    previewUrl={user.avatarLink || undefined}
                    onInput={avatar => {
                      onImageInput({ avatar, setFieldValue })
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField name="displayName" label="Name (Optional)" />
                </Grid>
                <Grid item>
                  <TextArea name="bio" label="Bio (Optional)" />
                </Grid>
                <Grid item>
                  <LinkList links={values.links} />
                </Grid>
                <Box height="4vh"></Box>
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

export default UserSignup2
