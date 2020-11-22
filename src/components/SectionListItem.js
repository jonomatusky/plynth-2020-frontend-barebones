import React from 'react'
import { Grid, Box, Typography, Paper, Button } from '@material-ui/core'
import styled from 'styled-components'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ClearIcon from '@material-ui/icons/Clear'
import LinkList from './LinkList'
import UserList from './UserList'

import { TextField, BarRow, TextArea, CheckButton } from './FormElements'

const StyledButton = styled(Button)`
  text-transform: none;
  background: none;
  border: none;
  padding: 0;
  min-width: 0.75rem;
`

const LinksListItem = ({ sections, index, remove, move, setFieldValue }) => {
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

  return (
    <Grid item>
      <Grid container direction="column">
        <BarRow container justify="space-between">
          <Grid item>
            <Grid container wrap="nowrap">
              <Grid item>
                <Box
                  marginLeft="0.5rem"
                  maxWidth="8rem"
                  textOverflow="ellipsis"
                >
                  <Typography noWrap>
                    <b>
                      Section {index + 2}: {sections[index].name}
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
                  <TextField name={`sections.${index}.title`} label="Title" />
                </Grid>
                <Grid item>
                  <TextArea name={`sections.${index}.text`} label="Text" />
                </Grid>
                <Grid item>
                  <LinkList links={sections[index].links} />
                </Grid>
                <Grid item>
                  <CheckButton
                    onClick={() => {
                      setFieldValue(
                        `sections.${index}.linkListIsSecondary`,
                        !sections[index].linkListIsSecondary
                      )
                    }}
                    name={`sections.${index}.linkListIsSecondary`}
                    label="These are secondary links"
                    checked={sections[index].linkListIsSecondary}
                  />
                </Grid>
                <Grid item>
                  <UserList users={sections[index].users} />
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
