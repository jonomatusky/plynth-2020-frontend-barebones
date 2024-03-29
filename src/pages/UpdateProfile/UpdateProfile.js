import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useUserStore } from 'hooks/store/use-user-store'

import FormLayout from 'layouts/FormLayout'
import { TextField, TextArea } from 'components/FormElements'
import AvatarInput from 'components/AvatarInput'
import LinkList from 'components/LinkList'
import ActionButton from 'components/ActionButton'

const UpdateProfile = () => {
  const history = useHistory()
  const { user, updateStatus, updateUser } = useUserStore()

  const handleSubmit = async values => {
    try {
      await updateUser(values)
      history.push('/admin/profile')
    } catch (err) {}
  }

  const { displayName, bio, links, avatar, avatarLink } = user || {}

  console.log(avatarLink)

  const initialValues = {
    displayName: displayName || '',
    bio: bio || '',
    avatar: avatar || '',
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
    <FormLayout>
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
                  imageUrl={avatarLink}
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
                  loading={updateStatus === 'loading'}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </FormLayout>
  )
}

export default UpdateProfile
