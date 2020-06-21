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
    <Container maxWidth="xs">
      <List>
        {props.items.map(scan => (
          <ListItem key={scan.id}>
            <ListItemAvatar>
              <Avatar
                alt={scan.creator ? scan.creator.displayName : 'Anonymous'}
                src={
                  scan.creator
                    ? `${REACT_APP_ASSET_URL}/${scan.creator.avatar}`
                    : 'https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-vinyl-icon-png-image_1753313.jpg'
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={scan.creator ? scan.creator.displayName : 'Anonymous'}
              secondary={`${
                scan.piece
                  ? `picked up ${scan.piece.title}`
                  : `tried to pick up a piece`
              } - ${moment(scan.createdAt).fromNow()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default ScanList
