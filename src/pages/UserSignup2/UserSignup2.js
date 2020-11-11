import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useThunkClient } from '../../hooks/thunk-hook'
import { updateUser } from '../../redux/userSlice'
import Background from '../../layouts/Background'
import FormLayout from '../../layouts/FormLayout'
import ActionButton from '../../components/ActionButton'
import AvatarInput from '../../components/AvatarInput'
import { BarRow } from '../../components/CardSections'
import { TextField, TextArea } from '../../components/FormElements'
import LinkList from '../../components/LinkList'

const title = 'Add Your Info'

const UserSignup2 = ({ values }) => {
  const dispatchThunk = useThunkClient()
  const { user, updateStatus } = useSelector(state => state.user)
  const history = useHistory()

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
      await dispatchThunk({
        thunk: updateUser,
        inputs: values,
      })
      history.push('/admin/get-started/success')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    history.push('/admin/get-started/success')
  }

  const onImageInput = ({ avatar, setFieldValue }) => {
    setFieldValue('avatar', avatar)
  }

  return (
    <>
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
                    loading={updateStatus === 'loading'}
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
