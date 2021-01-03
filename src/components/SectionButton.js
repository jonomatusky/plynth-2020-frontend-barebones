import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
// import { useUserStore } from 'hooks/store/use-user-store'

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
    console.log(type)
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
          Add Link Button
        </MenuItem>
        <MenuItem onClick={() => handleSelect('title')}>
          Add Title Section
        </MenuItem>
        <MenuItem onClick={() => handleSelect('text')}>
          Add Text Section
        </MenuItem>
        <MenuItem onClick={() => handleSelect('list.links')}>
          Add Link List
        </MenuItem>
        <MenuItem onClick={() => handleSelect('list.users')}>
          Add Profile List
        </MenuItem>
      </Menu>
    </>
  )
}

export default SectionButton
