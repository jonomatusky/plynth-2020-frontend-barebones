import React from 'react'
import { Grid } from '@material-ui/core'
import PieceItem from './PieceItem'

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
          piece={piece}
          // id={piece.id}
          // image={`${REACT_APP_ASSET_URL}/${piece.imageFilepath}`}
          // title={piece.title}
          // creator={piece.creator}
          // creatorDemo={piece.creatorDemo}
          setPieces={props.setPieces}
        />
      ))}
    </Grid>
  )
}

export default PieceList
