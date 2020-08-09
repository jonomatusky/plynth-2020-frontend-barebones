import React from 'react'
import { Grid } from '@material-ui/core'
import UserItem from './UserItem'

const UserList = props => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No users found. Create a new one?</h2>
      </div>
    )
  }

  return (
    <Grid container spacing={2}>
      {props.items.map(user => (
        <UserItem key={user.id} user={user} setUsers={props.setUsers} />
      ))}
    </Grid>
  )
}

export default UserList
