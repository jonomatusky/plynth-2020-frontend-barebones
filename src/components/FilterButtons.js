import React from 'react'
import { Grid, Button } from '@material-ui/core'

const FilterButtons = ({ filterFunction, currentFilter, items }) => {
  const handleClick = filter => {
    return () => {
      filterFunction(filter)
    }
  }

  return (
    <Grid container>
      {items.map((item, index) => {
        return (
          <Grid item key={index}>
            <Button
              onClick={handleClick(item.filterLabel)}
              color={
                item.filterLabel === currentFilter ? 'primary' : 'secondary'
              }
            >
              {item.label}
            </Button>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default FilterButtons
