import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'

import { AuthContext } from '../../shared/context/auth-context'
import { useApiClient } from '../../shared/hooks/api-hook'

import FormLayout from '../../shared/layouts/FormLayout'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import ActionButton from '../../shared/components/ui/ActionButton'
import AvatarInput from '../../users/components/AvatarInput'
import { BarRow } from '../../shared/components/ui/CardSections'
import {
  TextField,
  FieldSet,
  LinkBarRow,
  TextArea,
} from '../../shared/components/forms/FormElements'

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
        url: Yup.string().url('Must be a valid URL').required('Required'),
      })
    ),
  })

  const handleSubmit = async values => {
    try {
      let userData = { user: values }
      const response = await sendRequest(
        `/users/me`,
        'PATCH',
        JSON.stringify(userData)
      )

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
