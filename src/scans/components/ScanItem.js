import React from 'react'
import moment from 'moment'
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core'

import './ScanItem.css'

const { REACT_APP_BACKEND_URL } = process.env

const ScanItem = props => {
  const dateStamp = moment(props.scan.createdAt).fromNow()

  let title
  let name
  let avatar

  title = props.scan.piece.title
  name = props.scan.owner.displayName
  avatar = props.scan.owner.avatar

  return (
    <ListItem key={props.scan.id}>
      <ListItemAvatar>
        <Avatar alt={name} src={`${REACT_APP_BACKEND_URL}/${avatar}`} />
      </ListItemAvatar>
      <ListItemText
        primary={name || 'Anonymous'}
        secondary={`${
          props.scan.piece ? `picked up ${title}` : `tried to pick up a piece`
        } - ${dateStamp}`}
      />
    </ListItem>
  )
}

export default ScanItem
