import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box, Button, Typography } from '@material-ui/core'
import { Formik, Form } from 'formik'

import ActionButton from 'components/ActionButton'

const SimpleForm = ({
  children,
  onSubmit,
  status,
  initialValues,
  validationSchema,
  buttonLabel,
  confirmationMessage,
  onClose,
}) => {
  const history = useHistory()

  const handleSubmit = async (values, actions) => {
    if (status !== 'loading') {
      onSubmit(values, actions)
    }
  }
  console.log(status)

  if (status === 'succeeded') {
    return (
      <>
        <Grid item>
          <Typography variant="h6">{confirmationMessage}</Typography>
        </Grid>
        <Grid item>
          <Box height="1rem" />
        </Grid>
        {onClose && (
          <Grid item>
            <Button onClick={onClose || history.goBack}>Close</Button>
          </Grid>
        )}
      </>
    )
  } else {
    return (
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container direction="column" spacing={1}>
            {children.isArray ? (
              children.map(child => {
                return <Grid item>{child}</Grid>
              })
            ) : (
              <Grid item>{children}</Grid>
            )}
            <Box height="1rem" />
            <Grid item>
              <ActionButton
                type="submit"
                label={buttonLabel || `Submit`}
                loading={status === 'loading'}
              />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    )
  }
}

export default SimpleForm
