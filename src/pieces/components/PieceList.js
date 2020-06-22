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

const ScanList = props => {
  const classes = useStyles()

  if (props.items.length === 0) {
    return (
      <div>
        <h2>No pieces found. Create a new one?</h2>
      </div>
    )
  }

  return (
    <Grid container spacing={2} className={classes.grid}>
      {props.items.map(piece => (
        <Grid item xs={12}>
          <Card>
            <CardActionArea component={Link} to={`/pieces/${piece.id}`}>
              <Grid container wrap={'nowrap'}>
                <Grid item>
                  <div className={classes.image}>
                    <CardMedia
                      image={`${REACT_APP_ASSET_URL}/${piece.images[0].awsId}.${piece.images[0].ext}`}
                      title={piece.title}
                      className={classes.cover}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.details}>
                    <CardContent p={0.5}>
                      <Typography component="h6" variant="h6">
                        {piece.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {`by ${
                          piece.creator
                            ? piece.creator.displayName
                            : 'Anonymous'
                        }`}
                      </Typography>
                    </CardContent>
                  </div>
                </Grid>
              </Grid>
            </CardActionArea>
            {/* <CardActionArea
              component={Link}
              to={`${REACT_APP_ASSET_URL}/${piece.images[0].awsId.ext}`}
              className={classes.cardAction}
            >
              <Grid container>
                <Grid item xs={3}>
                  <Box>
                    <CardMedia
                      image={`${REACT_APP_ASSET_URL}/${piece.images[0].awsId}.${piece.images[0].ext}`}
                      title={piece.title}
                      className={classes.cover}
                    />
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <div className={classes.details}>
                    <div className={classes.content}>
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          {piece.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {`by ${piece.creator || 'Anonymous'}`}
                        </Typography>
                      </CardContent>
                    </div>
                  </div>
                </Grid>
              </Grid> */}
          </Card>
        </Grid>
      ))}

      {/* <List>
        {props.items.map(scan => (
          <ListItem key={scan.id}>
            <ListItemAvatar>
              <Avatar
                alt={scan.creator ? scan.creator.displayName : 'Anonymous'}
                src={
                  scan.creator
                    ? `${REACT_APP_ASSET_URL}/${scan.creator.avatar}`
                    : 'https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-vinyl-icon-png-image_1753313.jpg'
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={scan.creator ? scan.creator.displayName : 'Anonymous'}
              secondary={`${
                scan.piece
                  ? `picked up ${scan.piece.title}`
                  : `tried to pick up a piece`
              } - ${moment(scan.createdAt).fromNow()}`}
            />
          </ListItem>
        ))}
      </List> */}
    </Grid>
  )
}

export default ScanList
