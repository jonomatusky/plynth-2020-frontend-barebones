import React, { useContext } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Hidden,
  Drawer,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import AlbumIcon from '@material-ui/icons/Album'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import PersonIcon from '@material-ui/icons/Person'

import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import PeopleIcon from '@material-ui/icons/People'

import { AuthContext } from 'contexts/auth-context'
import Emoji from 'components/Emoji'
import plynthLogoWhite from 'images/plynth_logo_white.svg'

const drawerWidth = 200

const isInStandaloneMode = () => {
  return 'standalone' in window.navigator && window.navigator.standalone
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  bottomBar: {
    top: 'auto',
    bottom: 0,
    background: theme.palette.background.default,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'stretch',
    paddingLeft: theme.spacing(2),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  navBarRoot: {
    // background: theme.palette.background.default,
    borderTop: 1,
    // borderColor: theme.palette.secondary.main,
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
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  content: {
    flexGrow: 1,
  },
}))

const StyledLogo = styled.img`
  opacity: ${props => props.opacity || 1};
  width: 100%;
  max-width: 100px;
  height: 100%;
  object-fit: contain;
  object-position: 50% 50%;
  &:hover {
    opacity: 0.7;
  }
`

const MainHeader = ({ children, ...props }) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)

  const handleLogout = async () => {
    auth.logout()
  }

  const { pathname } = useLocation()

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              <Emoji symbol="🦸🏾‍♀️" label="superhero" /> Superadmin
            </Typography>
            {/* <Box flexGrow={1}>
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
            </Box> */}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="navigation menu">
          <Drawer
            open={true}
            variant="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <Link to={'/superadmin/pieces'}>
                <StyledLogo src={plynthLogoWhite} />
              </Link>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                component={NavLink}
                to={'/superadmin/pickups'}
                selected={pathname.includes('/superadmin/pickups')}
              >
                <ListItemIcon>
                  <CameraEnhanceIcon />
                </ListItemIcon>
                <ListItemText>Pickups</ListItemText>
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={'/superadmin/pieces'}
                selected={pathname.includes('/superadmin/pieces')}
              >
                <ListItemIcon>
                  <LibraryMusicIcon />
                </ListItemIcon>
                <ListItemText>Pieces</ListItemText>
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={'/superadmin/users'}
                selected={pathname.includes('/superadmin/users')}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText>Users</ListItemText>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                component={NavLink}
                to={'/admin/pickup'}
                selected={pathname === '/admin/pickup'}
              >
                <ListItemIcon>
                  <FlashOnIcon />
                </ListItemIcon>
                <ListItemText>Test</ListItemText>
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={'/admin/pieces'}
                selected={pathname === '/admin/pieces'}
              >
                <ListItemIcon>
                  <AlbumIcon />
                </ListItemIcon>
                <ListItemText>My Pieces</ListItemText>
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={'/admin/profile'}
                selected={pathname === '/admin/profile'}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>My Profile</ListItemText>
              </ListItem>
            </List>
            <Divider />
            <ListItem button onClick={handleLogout}>
              <ListItemText>Sign Out</ListItemText>
            </ListItem>
          </Drawer>
        </nav>
      </Hidden>
      <main className={classes.content}>{children}</main>

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
    </div>
  )
}

export default MainHeader
