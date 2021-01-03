import React from 'react'
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  withStyles,
  TextField,
} from '@material-ui/core'
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
  return (
    // <FormControl fullWidth color="secondary" margin="dense" {...props}>
    //   <InputLabel shrink id={labelId} htmlFor={labelId}>
    //     {label}
    //   </InputLabel>
    <Controller
      render={props => (
        <Autocomplete
          {...props}
          multiple
          id={labelId}
          options={options}
          getOptionLabel={option => option.username}
          // getOptionSelected={(option, value) => {
          //   return option.username === getOpObj(value).username
          // }}
          renderInput={params => (
            <TextField {...params} label={label} variant="outlined" />
          )}
          renderOption={option => option.username}
          onChange={(_, data) => props.onChange(data)}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      // onChange={([, obj]) => getOpObj(obj).username}
    />
    //   /* <FormHelperText>{helperText}</FormHelperText> */
    // </FormControl>
  )
}
export default UserAutocomplete
