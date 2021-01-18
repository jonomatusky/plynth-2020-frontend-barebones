import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { Grid, Box, Typography } from '@material-ui/core'

import { TextField, CheckButton } from 'components/FormElements'
import ActionButton from 'components/ActionButton'

export const SAUserForm = ({ user, status, onSubmit }) => {
  const { tier, admin, pieceLimitOverride, isDummy } = user || {}

  const initialValues = {
    admin: admin || false,
    tier,
    pieceLimitOverride: pieceLimitOverride || '',
    isDummy: isDummy || false,
  }

  const validationSchema = Yup.object({
    admin: Yup.boolean(),
    tier: Yup.string(),
    pieceLimitOverride: Yup.number('Must be an integer 0 or greater')
      .integer('Must be an integer 0 or greater')
      .min(0, 'Must be an integer 0 or greater'),
    isDummy: Yup.boolean(),
  })

  return (
    <Formik
      enableReinitialize="true"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <Grid container direction="column" spacing={1}>
            <Box height="1rem"></Box>
            <Grid item>
              <label htmlFor="tier" style={{ display: 'block' }}>
                <Typography>Tier</Typography>
              </label>
              <select
                value={values.tier}
                name="tier"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="free">Free</option>
                <option value="artist">Artist</option>
                <option value="agency">Agency</option>
              </select>
            </Grid>
            <Grid item>
              <TextField
                name="pieceLimitOverride"
                label="Manually override the users piece limit"
              />
            </Grid>
            <Grid item>
              <CheckButton
                onClick={() => setFieldValue('admin', !values.admin)}
                name="admin"
                label="Make this user an admin"
                checked={values.admin}
              />
            </Grid>
            <Grid item>
              <CheckButton
                onClick={() => setFieldValue('isDummy', !values.isDummy)}
                name="isDummy"
                label="This is a dummy user"
                checked={values.isDummy}
              />
            </Grid>
            <Grid item>
              <ActionButton
                type="submit"
                label="Save"
                loading={status === 'loading'}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
