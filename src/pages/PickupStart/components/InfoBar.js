import React from 'react'
import { Grid, Typography, IconButton, Tooltip } from '@material-ui/core'

import InfoIcon from '@material-ui/icons/Info'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

const StyledInfo = styled(InfoIcon)`
  opacity: 0.4;
  &:hover {
    opacity: 0.6;
  }
`

const TopBar = styled.div`
  top: 0;
  bottom: auto;
  position: fixed;
  display: flex;
  justify-content: right;
  padding: 0.5rem;
  padding-bottom: 0;
  left: 0;
  right: 0;
`

const StyledTooltip = withStyles(theme => ({
  tooltipPlacementTop: {
    margin: '0',
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    maxWidth: 220,
  },
}))(Tooltip)

const InfoBar = () => {
  return (
    <TopBar>
      <Grid container alignItems="center" justify="flex-end" spacing={0}>
        <Grid item>
          <StyledTooltip
            title={
              <>
                <Typography color="inherit">
                  Welcome to Plynth. It's like a QR code, without the QR code.
                </Typography>
                <br />
                <Typography color="inherit">Give it a try:</Typography>
                <Typography color="inherit">
                  1. Upload a photo of a piece of art
                </Typography>
                <Typography color="inherit">
                  2. Access the content it's linked to!
                </Typography>
              </>
            }
            enterTouchDelay={0}
            leaveTouchDelay={10}
            arrow={true}
            placement="bottom-end"
          >
            <IconButton aria-label="info">
              <StyledInfo />
            </IconButton>
          </StyledTooltip>
        </Grid>
      </Grid>
    </TopBar>
  )
}

export default InfoBar
