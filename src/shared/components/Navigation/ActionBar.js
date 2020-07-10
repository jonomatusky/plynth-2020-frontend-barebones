import React from 'react'

import { AppBar, Toolbar, Button } from '@material-ui/core'
import ActionButton from '../UIElements/ActionButton'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
    background: theme.palette.background.paper,
  },
}))

const ActionBar = props => {
  const classes = useStyles()

  const { primaryLabel, secondaryLabel, primaryAction, secondaryAction } = props
  return (
    <AppBar className={classes.bottomBar}>
      <Toolbar>
        <ActionButton onClick={primaryAction} label={primaryLabel} />
      </Toolbar>
    </AppBar>
  )
}

export default ActionBar
