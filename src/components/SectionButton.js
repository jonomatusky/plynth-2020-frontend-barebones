import React, { useState } from 'react'
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core'

import LinkIcon from '@material-ui/icons/Link'
import TitleIcon from '@material-ui/icons/Title'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline'
import ListIcon from '@material-ui/icons/List'
import PeopleIcon from '@material-ui/icons/People'
import RemoveIcon from '@material-ui/icons/Remove'

const SectionButton = props => {
  // const { fetchUserList } = useUserStore()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = type => {
    switch (type) {
      case 'link':
        props.append({ type, link: { text: '', url: '' } })
        break
      case 'title':
        props.append({ type, title: '' })
        break
      case 'text':
        props.append({ type, text: '' })
        break
      case 'list.links':
        props.append({ type, links: [] })
        break
      case 'list.users':
        // fetchUserList()
        props.append({ type, users: [] })
        break
      case 'divider':
        props.append({ type })
        break
      default:
        props.append({ name: '', url: '' })
    }
    handleClose()
  }

  return (
    <>
      <Button fullWidth onClick={handleOpen} color="secondary" size="large">
        <b>+ Add Section</b>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect('link')}>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Link button</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleSelect('title')}>
          <ListItemIcon>
            <TitleIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Heading/title</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleSelect('text')}>
          <ListItemIcon>
            <ViewHeadlineIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Text section</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleSelect('list.links')}>
          <ListItemIcon>
            <ListIcon fontSize="small" />
          </ListItemIcon>
          <Typography>List of links</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleSelect('list.users')}>
          <ListItemIcon>
            <PeopleIcon fontSize="small" />
          </ListItemIcon>
          <Typography>List of users</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleSelect('divider')}>
          <ListItemIcon>
            <RemoveIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Dividing line</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default SectionButton
