import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Box, AppBar, Toolbar, Button } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'

import { HashLink } from 'react-router-hash-link'
import plynthLogoBlack from 'images/plynth_logo_black.svg'
import plynthLogoWhite from 'images/plynth_logo_white.svg'

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

const WebsiteNavBar = ({ left, right, position, opacity }) => {
  const theme = useTheme()

  return (
    <AppBar position={position} color="transparent" elevation={0}>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          {left ? (
            left
          ) : (
            <Grid item xs={1}>
              <Grid container justify="flex-start">
                <Grid item>
                  <Button
                    component={RouterLink}
                    to="/"
                    startIcon={<PhotoCameraIcon />}
                    style={{ textTransform: 'none' }}
                  >
                    Home
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Box flexGrow={1}>
            <Grid container justify="center">
              <Grid item>
                <HashLink smooth to="/">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <StyledLogo
                      opacity={opacity}
                      src={
                        theme.palette.type === 'dark'
                          ? plynthLogoWhite
                          : plynthLogoBlack
                      }
                      alt="Plynth Logo"
                    />
                  </Grid>
                </HashLink>
              </Grid>
            </Grid>
          </Box>
          {right ? (
            right
          ) : (
            <Grid item xs={1}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button
                    component={RouterLink}
                    to="/admin/login"
                    style={{ textTransform: 'none' }}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default WebsiteNavBar
