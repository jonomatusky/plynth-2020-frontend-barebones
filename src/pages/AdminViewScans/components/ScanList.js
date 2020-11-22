import React from 'react'
import { Grid } from '@material-ui/core'
import ScanItem from './ScanItem'

const ScanList = props => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No scans found. Create a new one?</h2>
      </div>
    )
  }

  return (
    <Grid container spacing={2}>
      {props.items.map(scan => (
        <ScanItem key={scan.id} scan={scan} setScans={props.setScans} />
      ))}
    </Grid>
  )
}

export default ScanList
