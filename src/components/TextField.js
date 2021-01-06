import React from 'react'
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  withStyles,
} from '@material-ui/core'
import { Controller } from 'react-hook-form'

const MuiTextField = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    borderRadius: 0,
  },
  focused: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.background.default,
  },
  input: {
    fontWeight: 'bold',
  },
}))(OutlinedInput)

const TextField = ({
  name,
  label,
  control,
  type,
  defaultValue,
  helperText,
  multiline,
  rows,
  ...props
}) => {
  const labelId = `${name}-label`
  return (
    <FormControl fullWidth color="secondary" margin="dense" {...props}>
      <InputLabel shrink id={labelId} htmlFor={labelId}>
        {label}
      </InputLabel>
      <Controller
        as={
          <MuiTextField
            variant="outlined"
            name={name}
            id={labelId}
            multiline={multiline}
            rows={rows}
          />
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
        type={type}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
export default TextField
