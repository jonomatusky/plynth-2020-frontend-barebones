import React from 'react'
import { Link } from 'react-router-dom'
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

const PieceItem = props => {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Card>
        <CardActionArea component={Link} to={`/pieces/${props.id}`}>
          <Grid container wrap={'nowrap'}>
            <Grid item>
              <div className={classes.image}>
                <CardMedia
                  image={props.image}
                  title={props.title}
                  className={classes.cover}
                />
              </div>
            </Grid>
            <Grid item>
              <div className={classes.details}>
                <CardContent p={0.5}>
                  <Typography component="h6" variant="h6">
                    {props.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`by ${
                      props.creator ? props.creator.displayName : 'Anonymous'
                    }`}
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

export default PieceItem
