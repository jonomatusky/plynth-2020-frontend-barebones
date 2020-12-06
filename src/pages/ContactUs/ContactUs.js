import React from 'react'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import { Link } from '@material-ui/core'
import * as Yup from 'yup'
import { Grid, Button } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'

import { useRequest } from 'hooks/use-request'
import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import { TextField, TextArea } from 'components/FormElements'
import WebsiteNavBar from 'components/WebsiteNavBar'

const SignUp = () => {
  const { status, request } = useRequest()
  const history = useHistory()
  const location = useLocation()

  const confirmationMessage = `Thanks for contacting support. We'll get back to you shortly.`

  const handleSubmit = async values => {
    try {
      const data = { message: { ...values, type: 'contact' } }

      await request({
        url: `/messages`,
        method: 'POST',
        data,
      })
    } catch (err) {}
  }

  const handleClose = () => {
    history.push('/')
  }

  const initialValues = {
    name: '',
    email: '',
    subject: '',
    content: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Must be an email address').required('Required'),
    subject: Yup.string(),
    content: Yup.string(),
  })

  return (
    <>
      <WebsiteNavBar
        position="static"
        left={
          <Grid item xs={1}>
            <Grid container justify="flex-start">
              <Grid item>
                <Button
                  component={RouterLink}
                  to="/"
                  startIcon={<PhotoCameraIcon />}
                  style={{ textTransform: 'none' }}
                >
                  Home
                </Button>
              </Grid>
            </Grid>
          </Grid>
        }
        right={
          <Grid item xs={1}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  component={RouterLink}
                  to={{
                    pathname: '/admin/login',
                    state: { referrer: location.pathname },
                  }}
                  style={{ textTransform: 'none' }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Grid>
        }
      />
      <FormLayout
        title="Contact Us"
        message={
          <>
            Fill out the form below to get in touch. If you'd like to sign up
            for a Postcard Mixtape,{' '}
            <Link component={RouterLink} to="/s/signup/postcard-mixtape">
              click here
            </Link>
            . If you're an artist interested in trying out the app,{' '}
            <Link component={RouterLink} to="/s/signup/creators">
              click here
            </Link>
            .
          </>
        }
        onClose={handleClose}
      >
        <SimpleForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          initialValues={initialValues}
          validationSchema={validationSchema}
          confirmationMessage={confirmationMessage}
          status={status}
        >
          <TextField name="name" label="Name*" />
          <TextField name="email" label="Email*" type="email" />
          <TextField name="subject" label="Subject" />
          <TextArea name="content" label="Message" />
        </SimpleForm>
      </FormLayout>
    </>
  )
}

export default SignUp
