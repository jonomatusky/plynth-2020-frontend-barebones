import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useUserStore } from 'hooks/store/use-user-store'
import FormLayout from 'layouts/FormLayout'
import ActionButton from 'components/ActionButton'
import AvatarInput from 'components/AvatarInput'
import { BarRow } from 'components/CardSections'
import { TextField, TextArea } from 'components/FormElements'
import LinkList from 'components/LinkList'

const title = 'Add Your Info'

const UserSignup2 = () => {
  const { user, updateStatus, updateUser } = useUserStore()
  const history = useHistory()
  // const [initialValues, setInitialValues] = useState({
  //   avatar: '',
  //   displayName: '',
  //   bio: '',
  //   links: [],
  // })

  const { displayName, bio, links, avatar } = user || {}

  const initialValues = {
    displayName: displayName || '',
    bio: bio || '',
    avatar: avatar || '',
    links: links || [],
  }

  // useEffect(() => {
  //   if (user) {
  //     setInitialValues({
  //       avatar: user.avatar,
  //       displayName: user.displayName,
  //       bio: user.bio,
  //       links: user.links,
  //     })
  //   }
  // }, [user, setInitialValues])

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
      await updateUser(values)
      history.push('/admin/get-started/success')
    } catch (err) {}
  }

  const handleCancel = () => {
    history.push('/admin/get-started/success')
  }

  const onImageInput = ({ avatar, setFieldValue }) => {
    setFieldValue('avatar', avatar)
  }

  return (
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
  )
}

export default UserSignup2
