import React from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'

import theme from 'theme'
import { useRequest } from 'hooks/use-request'
import { useLogClient } from 'hooks/log-hook'

import { TextField } from 'components/FormElements'
import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'

const BetaSignup = () => {
  const { scanToken } = useSelector(state => state.scan)
  const { status, request } = useRequest()
  const { sendLog } = useLogClient()
  const history = useHistory()

  const handleClose = () => {
    history.push('/')
  }

  const handleSubmit = async values => {
    const userData = { user: values }
    await request({
      url: `/users/subscribe`,
      method: 'POST',
      data: userData,
    })
    if (!!scanToken) {
      await sendLog({
        url: `/scans`,
        data: { email: values.email, scanToken },
      })
    }
  }

  const initialValues = {
    email: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email address.')
      .required('Required'),
  })

  return (
    <FormLayout
      title="Sign Up"
      message={`We're currently in beta and opening up the app soon. Enter your
           email address below to be the first to know.`}
      onClose={handleClose}
    >
      <SimpleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        confirmationMessage={`Thanks, you're all signed up. We'll let you know as soon as the app's
            available. In the meantime, check out our website for more info.`}
        status={status}
        onClose={handleClose}
      >
        <TextField
          name="email"
          label="Email"
          type="email"
          autocapitalize="off"
          autocorrect="off"
        />
        <Box color={theme.palette.secondary.main}>
          <Typography variant="body2">
            <em>
              By submitting this form, you agree to recieve updates from the
              Plynth team.
            </em>
          </Typography>
        </Box>
      </SimpleForm>
    </FormLayout>
  )
}

export default BetaSignup
