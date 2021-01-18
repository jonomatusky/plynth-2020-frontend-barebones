import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import { Grid, Button, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import FormLayout from 'layouts/FormLayout'
import { SAUserForm } from './components/SAUserForm'
import { UserForm } from 'components/UserForm'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const UpdateProfile = props => {
  const classes = useStyles()
  const history = useHistory()
  const lastLocation = useLastLocation()
  const { username } = useParams()

  const { selectUser, updateStatus, updateUser } = useSAUsersStore()

  const user = selectUser(username)

  const handleSubmit = async values => {
    try {
      updateUser({ username, ...values })
      !!lastLocation
        ? history.goBack()
        : history.push(`admin/users/${username}`)
    } catch (err) {
      console.log(err)
    }
  }

  const { displayName, avatarLink, lastActiveAt } = user || {}

  return (
    <>
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
          {!!lastActiveAt && (
            <>
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
              <SAUserForm
                onSubmit={handleSubmit}
                user={user}
                status={updateStatus}
              />
            </>
          )}
          {!lastActiveAt && (
            <>
              <UserForm
                onSubmit={handleSubmit}
                user={user}
                status={updateStatus}
              />
            </>
          )}
        </FormLayout>
      )}
    </>
  )
}

export default UpdateProfile
