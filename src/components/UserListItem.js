import React from 'react'
import { Grid, Box, Typography, Paper, Button } from '@material-ui/core'
import styled from 'styled-components'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ClearIcon from '@material-ui/icons/Clear'
import Autocomplete from 'react-autocomplete'
import { useSelector } from 'react-redux'
import { getUsersByFilter } from 'redux/usersSlice'

import { BarRow, StyledInput, Label, TextInput } from './FormElements'

const StyledButton = styled(Button)`
  text-transform: none;
  background: none;
  border: none;
  padding: 0;
  min-width: 0.75rem;
`

const UserListItem = ({ users, index, remove, move, setFieldValue }) => {
  const allUsers = useSelector(getUsersByFilter)

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
              {!(index === users.length - 1) && (
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
                      Link {index + 1}: {users[index].name}
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
                  <Autocomplete
                    getItemValue={item => item.username}
                    items={allUsers}
                    wrapperStyle={{}}
                    shouldItemRender={(item, value) =>
                      item.username.toLowerCase().indexOf(value.toLowerCase()) >
                      -1
                    }
                    renderInput={props => {
                      return (
                        <StyledInput type="text">
                          <Label htmlFor="Owner">Owner</Label>
                          <TextInput
                            name="ownerUsername"
                            type="text"
                            {...props}
                          />
                        </StyledInput>
                      )
                    }}
                    renderMenu={function (items, value, style) {
                      return (
                        <div
                          style={{
                            ...style,
                            ...this.menuStyle,
                            zIndex: 1,
                            position: 'absolute',
                          }}
                          children={items}
                        />
                      )
                    }}
                    renderItem={(item, isHighlighted) => (
                      <div
                        key={item.id}
                        style={{
                          background: isHighlighted ? 'lightgray' : 'white',
                          color: 'black',
                        }}
                      >
                        {item.username}
                      </div>
                    )}
                    value={`users.${index}.`}
                    onChange={e =>
                      setFieldValue('ownerUsername', e.target.value)
                    }
                    onSelect={val => setFieldValue('ownerUsername', val)}
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

export default UserListItem
