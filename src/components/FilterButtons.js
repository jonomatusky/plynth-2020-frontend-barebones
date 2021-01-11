import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Button } from '@material-ui/core'

const FilterButtons = ({ filterFunction, currentFilter, items }) => {
  const dispatch = useDispatch()

  const handleClick = filter => {
    return () => {
      console.log(filter)
      dispatch(filterFunction(filter))
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
