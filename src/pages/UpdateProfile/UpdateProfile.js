import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { updateUser } from 'redux/userSlice'

import ErrorBar from 'components/ErrorBar'
import Background from 'layouts/Background'
import FormLayout from 'layouts/FormLayout'
import { TextField, TextArea } from 'components/FormElements'
import AvatarInput from 'components/AvatarInput'
import LinkList from 'components/LinkList'
import ActionButton from 'components/ActionButton'
import { useThunkClient } from 'hooks/thunk-hook'

const UpdateProfile = () => {
  const dispatchThunk = useThunkClient()
  const history = useHistory()
  const { user } = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const handleSubmit = async values => {
    setIsLoading(true)
    try {
      await dispatchThunk({
        thunk: updateUser,
        inputs: values,
      })
      setIsLoading(false)
      history.push('/admin/profile')
    } catch (err) {
      console.log(err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  const { displayName, bio, links, avatar, avatarLink } = user || {}

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
        <ErrorBar
          open={!!error}
          error={error}
          handleClose={() => setError(false)}
        />
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
