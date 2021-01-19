import React from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'
import { useLog } from 'hooks/use-log'

import { TextField } from 'components/FormElements'
import SimpleForm from 'components/SimpleForm'

const EmailSignupForm = () => {
  const { scanToken } = useSelector(state => state.scan)
  const { status, request } = useRequest()
  const { sendLog } = useLog()
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
    <Box
      minHeight="180px"
      display="flex"
      flexDirection="column"
      justifyItems="center"
    >
      {status !== 'succeeded' ? (
        <SimpleForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          status={status}
          onClose={handleClose}
          ps={`By submitting this form you agree to recieve emails from the
          Plynth team.`}
        >
          <TextField
            name="email"
            label="Enter your email"
            type="email"
            autocapitalize="off"
            autocorrect="off"
          />
        </SimpleForm>
      ) : (
        <Typography variant="h6">
          Great, you're all signed up. Stay tuned for more!
        </Typography>
      )}
    </Box>
  )
}

export default EmailSignupForm
