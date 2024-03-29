import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  card: {},
  cardAction: {
    display: 'flex',
  },
  image: {
    height: 100,
    width: 100,
  },
  details: {
    height: '100%',
    flex: '1 0 auto',
  },
  content: {},
  cover: {
    height: '100%',
    width: '100%',
  },
}))

const UserItem = ({ user, ...props }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = () => {
    history.push(`/superadmin/users/${user.username}`)
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <Grid container wrap={'nowrap'}>
            <Grid item>
              <div className={classes.image}>
                {user.avatar && (
                  <CardMedia
                    image={user.avatarLink}
                    title={user.displayName}
                    className={classes.cover}
                  />
                )}
              </div>
            </Grid>
            <Grid item>
              <div className={classes.details}>
                <CardContent>
                  <Typography component="h6" variant="h6">
                    {user.displayName}
                  </Typography>
                  <Typography color="textSecondary">
                    Last Active:{' '}
                    {user.lastActiveAt
                      ? new Date(user.lastActiveAt).toLocaleDateString()
                      : 'N/A'}
                  </Typography>
                  <Typography color="textSecondary">
                    Pieces: {user.pieceCount}/{user.pieceLimit}
                  </Typography>
                </CardContent>
              </div>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default UserItem
