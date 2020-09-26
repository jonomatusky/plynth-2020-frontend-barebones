import React from 'react'
import { Grid, Box, Typography, Paper, Button } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import DragHandleIcon from '@material-ui/icons/DragHandle'

import { TextField, BarRow } from './FormElements'

const DragItem = styled.div`
  padding-bottom: 1rem;
`

const StyledButton = styled(Button)`
  text-transform: none;
  background: none;
  border: none;
  padding: 0;
`

const StyledDiv = styled.div`
  display: flex;
  alignitems: center;
`

const LinksListItem = ({ link, index, remove }) => {
  const RemoveButton = () => {
    return (
      <StyledButton
        variant="text"
        color="inherit"
        onClick={() => remove(index)}
      >
        <Typography>
          <b>Remove X</b>
        </Typography>
      </StyledButton>
    )
  }

  const MoveText = () => {
    return (
      <StyledDiv>
        <DragHandleIcon />
        <Typography>
          <b>Move</b>
        </Typography>
      </StyledDiv>
    )
  }

  return (
    <Draggable draggableId={link.id} index={index}>
      {provided => (
        <DragItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Grid container direction="column" key={index}>
            <BarRow container justify="space-between">
              <Grid item>
                <MoveText />
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
        </DragItem>
      )}
    </Draggable>
  )
}

export default LinksListItem
