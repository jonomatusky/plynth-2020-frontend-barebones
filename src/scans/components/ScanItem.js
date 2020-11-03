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

const UserItem = ({ scan, ...props }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = () => {
    history.push(`/admin/pickups/${scan.id}`)
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <Grid container wrap={'nowrap'}>
            <Grid item>
              <div className={classes.image}>
                <CardMedia
                  image={scan.imageLink}
                  title={scan.createdAt}
                  className={classes.cover}
                />
              </div>
            </Grid>
            <Grid item>
              <div className={classes.details}>
                <CardContent p={0.5}>
                  <Typography component="h6" variant="h6">
                    {scan.pieceTitle || 'No Match'}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`picked up by ${
                      scan.owner ? scan.owner.displayName : 'Anonymous'
                    } on ${new Date(scan.createdAt).toLocaleString()}`}
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
