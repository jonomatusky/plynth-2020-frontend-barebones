import React, { useState } from 'react'
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import PieceModal from '../pages/PieceModal'
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

const PieceItem = ({ piece, ...props }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
    if (props.setPieces) {
      props.setPieces(p => p.concat(props.id))
    }
  }

  const handleClose = value => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <PieceModal
        open={open}
        onClose={handleClose}
        piece={piece}
        key={props.key}
      />
      <Grid item xs={12}>
        <Card>
          <CardActionArea onClick={handleClickOpen}>
            <Grid container wrap={'nowrap'}>
              <Grid item>
                <div className={classes.image}>
                  <CardMedia
                    image={`${REACT_APP_ASSET_URL}/${piece.imageFilepath}`}
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
                      {piece.owner.displayName &&
                        `by ${piece.owner.displayName}`}
                    </Typography>
                  </CardContent>
                </div>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  )
}

export default PieceItem
