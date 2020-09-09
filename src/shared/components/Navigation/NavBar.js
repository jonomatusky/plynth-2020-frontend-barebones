import React, { useState, useRef } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Fab,
  Hidden,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core'

import ScanModal from '../../../scans/pages/ScanModal'
import AlbumIcon from '@material-ui/icons/Album'
import AddCircleIcon from '@material-ui/icons/AddCircle'
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
    marginBottom: isInStandaloneMode() ? theme.spacing(4) : theme.spacing(0),
    minHeight: '4rem',
    padding: '0.5rem',
  },
  navBarActionRoot: {
    color: theme.palette.text.primary,
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  },
}))

const MainHeader = props => {
  const [scanModalIsActive, setScanModalIsActive] = useState(false)
  const [file, setFile] = useState(null)

  const classes = useStyles()

  const filePickerRef = useRef()

  const filePickerHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  const pickHandler = async event => {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0])
    }
    setScanModalIsActive(true)
    filePickerRef.current.value = ''
  }

  return (
    <React.Fragment>
      <ScanModal
        isOpen={scanModalIsActive}
        setIsOpen={setScanModalIsActive}
        file={file}
      />
      <input
        id="image"
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accepts=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
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
              label="Test"
              icon={<FlashOnIcon />}
              component={NavLink}
              to={'/admin/pickup'}
              activeClassName="Mui-selected"
              classes={{ root: classes.navBarActionRoot }}
            />
            <BottomNavigationAction
              label="My Pieces"
              icon={<AlbumIcon />}
              component={NavLink}
              to={'/admin/pieces'}
              activeClassName="Mui-selected"
              classes={{ root: classes.navBarActionRoot }}
            />
            <BottomNavigationAction
              label="My Profile"
              icon={<PersonIcon />}
              component={NavLink}
              to={'/admin/profile'}
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
