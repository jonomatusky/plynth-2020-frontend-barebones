import React from 'react'

import { AppBar, Toolbar } from '@material-ui/core'
import ActionButton from '../ui/ActionButton'

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
          <ActionButton
            onClick={secondaryAction}
            label={secondaryLabel}
            variant="text"
            fullWidth={false}
          />
        )}
        {!!primaryLabel && (
          <ActionButton
            onClick={primaryAction}
            label={primaryLabel}
            {...others}
          />
        )}
      </Toolbar>
    </AppBar>
  )
}

export default ActionBar
