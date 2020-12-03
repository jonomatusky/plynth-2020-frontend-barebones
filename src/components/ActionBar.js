import React from 'react'

import { AppBar, Toolbar, Box } from '@material-ui/core'
import ActionButton from './ActionButton'

import { makeStyles } from '@material-ui/core/styles'

const isInStandaloneMode = () => {
  return 'standalone' in window.navigator && window.navigator.standalone
}

const useStyles = makeStyles(theme => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
    background: '#00000000',
    paddingBottom: isInStandaloneMode() ? theme.spacing(4) : theme.spacing(0),
    elevation: 0.0,
  },
}))

const ActionBar = props => {
  const classes = useStyles()

  const {
    primaryLabel,
    secondaryLabel,
    primaryAction,
    secondaryAction,
    ...others
  } = props
  return (
    <AppBar className={classes.bottomBar}>
      <Toolbar>
        {!!secondaryLabel && (
          <Box flexGrow={1}>
            <ActionButton
              onClick={secondaryAction}
              label={secondaryLabel}
              fullWidth={false}
              variant="text"
            />
          </Box>
        )}
        {!!primaryLabel && (
          <Box flexGrow={1}>
            <ActionButton
              onClick={primaryAction}
              label={primaryLabel}
              fullWidth={true}
              {...others}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default ActionBar
