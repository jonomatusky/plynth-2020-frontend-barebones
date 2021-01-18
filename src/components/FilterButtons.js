import React from 'react'
import { Grid, Button } from '@material-ui/core'

const FilterButtons = ({ filterFunction, currentFilter, items }) => {
  const handleClick = filter => {
    return () => {
      console.log(filter)
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
                item.filterLabel === currentFilter ? 'secondary' : 'default'
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
