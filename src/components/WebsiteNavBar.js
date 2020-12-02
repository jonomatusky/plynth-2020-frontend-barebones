import React from 'react'
import { Grid, Box, AppBar, Toolbar } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import styled from 'styled-components'

import { HashLink } from 'react-router-hash-link'
import plynthLogoBlack from 'images/plynth_logo_black.svg'
import plynthLogoWhite from 'images/plynth_logo_white.svg'

const StyledLogo = styled.img`
  width: 100%;
  max-width: 100px;
  height: 100%;
  object-fit: contain;
  object-position: 50% 50%;
  &:hover {
    opacity: 0.7;
  }
`

const WebsiteNavBar = ({ left, right, position }) => {
  const theme = useTheme()

  return (
    <AppBar position={position} color="transparent" elevation={0}>
      <Toolbar>
        <Grid container justify="space-between">
          {left}
          <Box flexGrow={1}>
            <Grid container justify="center">
              <Grid item>
                <HashLink smooth to="/#about">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <StyledLogo
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
          {right}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default WebsiteNavBar
