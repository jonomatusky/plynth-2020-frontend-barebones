import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Hidden,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core'

import AlbumIcon from '@material-ui/icons/Album'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import FlashOnIcon from '@material-ui/icons/FlashOn'

import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

const isInStandaloneMode = () => {
  return 'standalone' in window.navigator && window.navigator.standalone
}

console.log(isInStandaloneMode())

const useStyles = makeStyles(theme => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
    background: theme.palette.background.default,
  },
  navBarRoot: {
    background: theme.palette.background.default,
    borderTop: 1,
    borderColor: theme.palette.secondary.main,
    marginBottom: isInStandaloneMode() ? theme.spacing(4) : theme.spacing(0),
  },
  navBarActionRoot: {
    color: theme.palette.text.primary,
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  },
}))

const MainHeader = props => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Hidden smDown>
        <AppBar position="fixed">
          <Toolbar>
            <Box flexGrow={1}>
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
                to={'/collection'}
              >
                Collection
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
            </Box>

            <Button variant="contained" component={NavLink} to={'/pickup'}>
              New Pickup
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Hidden>
      <Hidden mdUp>
        <AppBar className={classes.bottomBar}>
          <BottomNavigation
            showLabels
            classes={{
              root: classes.navBarRoot,
              selected: classes.navBarSelected,
            }}
          >
            <BottomNavigationAction
              label="Collection"
              icon={<AlbumIcon />}
              component={NavLink}
              to={'/collection'}
              activeClassName="Mui-selected"
              classes={{ root: classes.navBarActionRoot }}
            />
            <BottomNavigationAction
              label="Activity"
              icon={<FlashOnIcon />}
              component={NavLink}
              to={'/pickups'}
              activeClassName="Mui-selected"
              classes={{ root: classes.navBarActionRoot }}
            />
            <BottomNavigationAction
              label="Create"
              icon={<AddCircleIcon />}
              component={NavLink}
              to={'/pieces'}
              activeClassName="Mui-selected"
              classes={{ root: classes.navBarActionRoot }}
            />
          </BottomNavigation>
        </AppBar>
      </Hidden>
    </React.Fragment>
  )
}

export default MainHeader
