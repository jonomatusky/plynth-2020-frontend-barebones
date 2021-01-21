import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, Avatar } from '@material-ui/core'

import { PieceTitle, BarRow, DescriptionText } from 'components/CardSections'
import { LinkButton } from 'components/LinkButton'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const UserCard = ({ user, onClose, subtitle, ...props }) => {
  const classes = useStyles()

  return (
    <Box border={1} borderColor="secondary.main" bgcolor="background.card">
      <Grid container justify="center">
        <Grid item xs={12}>
          <BarRow buttonLabel="Close X" onClose={onClose} />
        </Grid>
        <Grid item xs={12}>
          <Box pt={2} pb={2}>
            <Grid container alignItems="center">
              <Grid item xs={5}>
                <Grid container justify="center">
                  <Grid item>
                    <Avatar
                      src={user.avatarLink}
                      alt="Preview"
                      className={classes.large}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={7}>
                <Box textAlign="left" padding={1} overflow="hidden">
                  <PieceTitle variant="h5">{user.displayName}</PieceTitle>
                  {subtitle}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {(!!user.bio || (user.links || []).length > 0) && (
          <Grid item xs={12}>
            <Box borderColor="secondary.main" borderTop={1} pt={2} pb={2}>
              <Grid container spacing={3} justify="center">
                <Grid item xs={11}>
                  <DescriptionText>{user.bio}</DescriptionText>
                </Grid>
                {(user.links || []).map((link, index) => {
                  return (
                    <Grid item xs={11} key={link.id || index}>
                      <LinkButton link={link} />
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default UserCard
