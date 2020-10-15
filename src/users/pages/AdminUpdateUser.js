import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLastLocation } from 'react-router-last-location'
import { Grid, Box, Button, Typography, Avatar } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'

import { useApiClient } from '../../shared/hooks/api-hook'
import { selectUser, setUser } from '../../redux/usersSlice'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import {
  TextField,
  CheckButton,
} from '../../shared/components/forms/FormElements'
import ActionButton from '../../shared/components/ui/ActionButton'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const UpdateProfile = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const lastLocation = useLastLocation()
  const { username } = useParams()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const user = useSelector(state => selectUser(state, username))

  console.log(lastLocation)

  const handleSubmit = async values => {
    try {
      const userData = { user: values }
      const response = await sendRequest(
        `/users/${user.username}`,
        'PATCH',
        userData
      )
      console.log(response.user)
      dispatch(setUser({ user: response.user }))
      !!lastLocation
        ? history.goBack()
        : history.push(`admin/users/${username}`)
    } catch (err) {
      console.log(err)
    }
  }

  const { displayName, avatarLink, tier, admin, pieceLimitOverride, isDummy } =
    user || {}

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
    <>
      <Background />
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      {user && (
        <FormLayout
          bottom={
            <Button
              color="inherit"
              onClick={() => history.push(`/admin/users/${username}/remove`)}
            >
              Remove User
            </Button>
          }
        >
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <Avatar
                src={avatarLink}
                alt="Preview"
                className={classes.large}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">{displayName || ' '}</Typography>
            </Grid>
          </Grid>
          <Formik
            enableReinitialize="true"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                      loading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </FormLayout>
      )}
    </>
  )
}

export default UpdateProfile
