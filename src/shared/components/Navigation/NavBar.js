import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Hidden,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core'

import RestoreIcon from '@material-ui/icons/Restore'
import AlbumIcon from '@material-ui/icons/Album'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CameraAltIcon from '@material-ui/icons/CameraAlt'

import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
  },
}))

const MainHeader = props => {
  const classes = useStyles()

  // const [value, setValue] = useState(0)

  // const handleChange = (event, value) => {
  //   setValue(value)
  // }

  return (
    <React.Fragment>
      <Hidden smDown>
        <AppBar position="fixed">
          <Toolbar>
            <Button
              color="inherit"
              component={NavLink}
              activeClassName="Mui-selected"
              to={'/pickups'}
            >
              Activity
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              activeClassName="Mui-selected"
              to={'/pickup'}
            >
              Pickup
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              activeClassName="Mui-selected"
              to={'/create'}
            >
              Create
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              activeClassName="Mui-selected"
              to={'/pieces'}
            >
              My Pieces
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              activeClassName="Mui-selected"
              to={'/collection'}
            >
              Collection
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Hidden>
      <Hidden mdUp>
        <AppBar className={classes.bottomBar}>
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="Activity"
              icon={<RestoreIcon />}
              component={NavLink}
              to={'/pickups'}
              activeClassName="Mui-selected"
            />
            <BottomNavigationAction
              label="Pickup"
              icon={<CameraAltIcon />}
              component={NavLink}
              to={'/pickup'}
              activeClassName="Mui-selected"
            />
            <BottomNavigationAction
              label="Create"
              icon={<AddCircleIcon />}
              component={NavLink}
              to={'/create'}
              activeClassName="Mui-selected"
            />
            <BottomNavigationAction
              label="My Pieces"
              icon={<AlbumIcon />}
              component={NavLink}
              to={'/pieces'}
              activeClassName="Mui-selected"
            />
            <BottomNavigationAction
              label="Collection"
              icon={<AlbumIcon />}
              component={NavLink}
              to={'/collection'}
              activeClassName="Mui-selected"
            />
          </BottomNavigation>
        </AppBar>
      </Hidden>
    </React.Fragment>
  )
}

export default MainHeader
