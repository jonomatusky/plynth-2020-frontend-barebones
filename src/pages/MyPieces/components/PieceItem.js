import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import theme from '../../../theme'

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

const StyledPaper = styled(Paper)`
  background-color: ${theme.palette.background.default};
`

const PieceItem = ({ piece, ...props }) => {
  const history = useHistory()
  const classes = useStyles()

  const handleClick = () => {
    history.push(`/admin/pieces/${piece.id}`)
  }

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Card>
          <StyledPaper>
            <CardActionArea onClick={handleClick}>
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
          </StyledPaper>
        </Card>
      </Grid>
    </React.Fragment>
  )
}

export default PieceItem
