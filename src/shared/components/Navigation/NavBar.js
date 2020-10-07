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
import FlashOnIcon from '@material-ui/icons/FlashOn'
import PersonIcon from '@material-ui/icons/Person'
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

const isInStandaloneMode = () => {
  return 'standalone' in window.navigator && window.navigator.standalone
}

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
    marginBottom: isInStandaloneMode() ? theme.spacing(3) : theme.spacing(0),
    minHeight: '4rem',
    padding: '0.5rem',
  },
  navBarActionRoot: {
    color: theme.palette.text.primary,
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  },
  label: {
    fontSize: '0.9rem',
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
                to={'/admin/pickup'}
              >
                Test
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                activeClassName="Mui-selected"
                to={'/admin/pieces'}
              >
                My Pieces
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                activeClassName="Mui-selected"
                to={'/admin/profile'}
              >
                My Profile
              </Button>
            </Box>
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
              label={<span className="bottomNavLabel">Test</span>}
              icon={<FlashOnIcon />}
              component={NavLink}
              to={'/admin/pickup'}
              activeClassName="Mui-selected"
              classes={{ root: classes.navBarActionRoot, label: classes.label }}
            />
            <BottomNavigationAction
              label={<span className="bottomNavLabel">My Pieces</span>}
              icon={<AlbumIcon />}
              component={NavLink}
              to={'/admin/pieces'}
              activeClassName="Mui-selected"
              classes={{ root: classes.navBarActionRoot, label: classes.label }}
            />
            <BottomNavigationAction
              label={<span className="bottomNavLabel">My Profile</span>}
              icon={<PersonIcon />}
              component={NavLink}
              to={'/admin/profile'}
              activeClassName="Mui-selected"
              classes={{ root: classes.navBarActionRoot, label: classes.label }}
            />
          </BottomNavigation>
        </AppBar>
      </Hidden>
    </React.Fragment>
  )
}

export default MainHeader
