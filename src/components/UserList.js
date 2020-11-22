import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { FieldArray } from 'formik'

import UserListItem from './UserListItem'

const UserList = ({ users, setFieldValue }) => {
  return (
    <FieldArray name="users">
      {({ remove, push, move }) => (
        <Grid container direction="column" spacing={2}>
          {(users || []).map((user, index) => (
            <UserListItem
              key={index}
              users={users}
              index={index}
              remove={remove}
              move={move}
              push={push}
              setFieldValue={setFieldValue}
            />
          ))}
          <Grid item>
            <Grid container justify="center">
              <Button
                onClick={() => push({ user: null })}
                color="secondary"
                size="large"
              >
                <b>+ Add A Link</b>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </FieldArray>
  )
}

export default UserList
