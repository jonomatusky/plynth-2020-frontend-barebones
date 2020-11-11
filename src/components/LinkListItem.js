import React from 'react'
import { Grid, Box, Typography, Paper, Button } from '@material-ui/core'
import styled from 'styled-components'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ClearIcon from '@material-ui/icons/Clear'

import { TextField, BarRow } from './FormElements'

const StyledButton = styled(Button)`
  text-transform: none;
  background: none;
  border: none;
  padding: 0;
  min-width: 0.75rem;
`

const LinksListItem = ({ links, index, remove, move }) => {
  const RemoveButton = () => {
    return (
      <StyledButton
        variant="text"
        color="inherit"
        onClick={() => remove(index)}
      >
        <Typography>
          <b>Remove</b>
        </Typography>
        <ClearIcon fontSize="small" />
      </StyledButton>
    )
  }

  const UpButton = () => {
    return (
      <StyledButton
        variant="text"
        color="inherit"
        onClick={() => move(index, index - 1)}
      >
        <ExpandLessIcon />
      </StyledButton>
    )
  }

  const DownButton = () => {
    return (
      <StyledButton
        variant="text"
        color="inherit"
        onClick={() => {
          move(index, index + 1)
        }}
      >
        <ExpandMoreIcon />
      </StyledButton>
    )
  }

  return (
    <Grid item>
      <Grid container direction="column">
        <BarRow container justify="space-between">
          <Grid item>
            <Grid container wrap="nowrap">
              {!(index === links.length - 1) && (
                <Grid item>
                  <DownButton />
                </Grid>
              )}
              {!(index === 0) && (
                <Grid item>
                  <UpButton />
                </Grid>
              )}
              <Grid item>
                <Box
                  marginLeft="0.5rem"
                  maxWidth="8rem"
                  textOverflow="ellipsis"
                >
                  <Typography noWrap>
                    <b>
                      Link {index + 1}: {links[index].name}
                    </b>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <RemoveButton />
          </Grid>
        </BarRow>
        <Paper square>
          <Grid container justify="center">
            <Grid item xs={11}>
              <Grid container direction="column" spacing={1}>
                <Box height="1rem" />
                <Grid item>
                  <TextField
                    label="URL"
                    name={`links.${index}.url`}
                    type="url"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name={`links.${index}.name`}
                    label="Link Text"
                    type="text"
                  />
                </Grid>
                <Box height="1.5rem" />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default LinksListItem
