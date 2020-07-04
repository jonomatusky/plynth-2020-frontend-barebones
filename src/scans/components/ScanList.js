import React from 'react'
import moment from 'moment'
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core'

const { REACT_APP_ASSET_URL } = process.env

const ScanList = props => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No pickups found. Pick up a new one?</h2>
      </div>
    )
  }

  return (
    <List>
      {props.items.map(scan => (
        <ListItem key={scan.id}>
          <ListItemAvatar>
            <Avatar
              alt={scan.owner ? scan.owner.displayName : 'Anonymous'}
              src={
                scan.owner
                  ? `${REACT_APP_ASSET_URL}/${scan.owner.avatar}`
                  : 'https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-vinyl-icon-png-image_1753313.jpg'
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={scan.owner ? scan.owner.displayName : 'Anonymous'}
            secondary={`${
              scan.piece
                ? `picked up ${scan.piece.title}`
                : `tried to pick up a piece`
            } - ${moment(scan.createdAt).fromNow()}`}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default ScanList
