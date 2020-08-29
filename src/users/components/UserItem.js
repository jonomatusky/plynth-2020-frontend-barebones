import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const { REACT_APP_ASSET_URL } = process.env

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
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const history = useHistory()

  const handleClick = () => {
    history.push(`/users/${user.id}`)
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <Grid container wrap={'nowrap'}>
            <Grid item>
              <div className={classes.image}>
                <CardMedia
                  image={user.avatarLink}
                  title={user.displayName}
                  className={classes.cover}
                />
              </div>
            </Grid>
            <Grid item>
              <div className={classes.details}>
                <CardContent p={0.5}>
                  <Typography component="h6" variant="h6">
                    {user.displayName}
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
