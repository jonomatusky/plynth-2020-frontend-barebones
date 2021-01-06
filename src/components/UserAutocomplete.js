import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Controller } from 'react-hook-form'

// const MuiTextField = withStyles(theme => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//     borderRadius: 0,
//   },
//   input: {
//     '&:focus': {
//       backgroundColor: theme.palette.common.white,
//       color: theme.palette.background.default,
//     },
//     fontWeight: 'bold',
//   },
// }))(OutlinedInput)

const UserAutocomplete = ({
  name,
  label,
  options,
  control,
  type,
  defaultValue,
  helperText,
}) => {
  // const getOpObj = option => {
  //   if (!option.username) option = options.find(op => op.username === option)
  //   return option
  // }

  const labelId = `${name}-label`

  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    if (inputValue.length > 0) {
      setOpen(true)
    }
  }
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue)
    if (newInputValue.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  return (
    <Controller
      render={props => (
        <Autocomplete
          {...props}
          open={open}
          onOpen={handleOpen}
          onClose={() => setOpen(false)}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          multiple
          id={labelId}
          options={options}
          getOptionLabel={option => option.username}
          getOptionSelected={(option, value) => option.id === value.id}
          renderInput={params => (
            <TextField {...params} label="Add Users" variant="outlined" />
          )}
          renderOption={option => option.username}
          onChange={(_, data) => props.onChange(data)}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  )
}
export default UserAutocomplete
