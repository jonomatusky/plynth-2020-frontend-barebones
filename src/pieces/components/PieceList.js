import React from 'react'
import { Grid } from '@material-ui/core'
import PieceItem from './PieceItem'

const { REACT_APP_ASSET_URL } = process.env

const PieceList = props => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No pieces found. Create a new one?</h2>
      </div>
    )
  }

  return (
    <Grid container spacing={2}>
      {props.items.map(piece => (
        <PieceItem
          key={piece.id}
          id={piece.id}
          image={`${REACT_APP_ASSET_URL}/${piece.images[0].filepath}`}
          title={piece.title}
          creator={piece.isCreators ? piece.creators[0] : piece.owner}
        />
      ))}
    </Grid>
  )
}

export default PieceList
