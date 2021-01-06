import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { useField } from 'formik'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import styled from 'styled-components'
import theme from '../theme'

export const ImageBox = styled.div`
  height: 200px;
  width: 200px;
  text-align: center;
`

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`

export const BarRow = styled(Grid)`
  background: ${theme.palette.secondary.main};
  padding-left: 10px;
  padding-right: 10px;
  color: ${theme.palette.background.paper};
`

export const BarTitle = styled(Grid)`
  font-weight: bold;
`

export const BarAction = styled(Button)`
  text-transform: none;
  background: none;
  border: none;
  padding: 0;
`

export const FieldSet = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
`

export const StyledInput = styled.div`
  color: ${props =>
    props.error ? theme.palette.error.main : theme.palette.secondary.main};
  border-color: ${props =>
    props.error ? theme.palette.error.main : theme.palette.secondary.main};
`

export const Label = styled.label`
  color: inherit;
`

export const TextInput = styled.input`
  width: 100%;
  font: inherit;
  color: white;
  border: 1px solid;
  border-radius: 0px;
  border-color: inherit;
  background: ${theme.palette.background.input};
  padding: 0.2rem 0.6rem 0.3rem 0.6rem;
  margin: 0.4rem 0rem 0.4rem 0rem;
  font-weight: bold;
  font-size: 1.2rem;
  &:focus {
    background: white;
    color: ${theme.palette.background.input};
    border-radius: 0px;
    outline: 1px solid ${theme.palette.primary.main};
    border: 1px solid ${theme.palette.primary.main};
  }
`

const TitleInput = styled(TextInput)`
  font-weight: bold;
  font-size: 1.5rem;
`

const TextAreaInput = styled.textarea`
  width: 100%;
  font: inherit;
  color: white;
  border: 1px solid;
  border-radius: 0px;
  border-color: inherit;
  background: ${theme.palette.background.input};
  padding: 0.2rem 0.6rem 0.3rem 0.6rem;
  margin: 0.4rem 0rem 0.4rem 0rem;
  font-weight: bold;
  font-size: 1.2rem;
  resize: none;
  resize: vertical;
  display: block;
  height: 6em;
  &:focus {
    background: white;
    color: ${theme.palette.background.input};
    border-radius: 0px;
    outline: 1px solid ${theme.palette.primary.main};
    border: 1px solid ${theme.palette.primary.main};
  }
`

const ErrorMessage = styled.div`
  color: inherit;
`

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const showError = meta.touched && meta.error
  return (
    <StyledInput error={showError}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextInput type="text" {...field} {...props} />
      {showError ? <ErrorMessage>Error: {meta.error}</ErrorMessage> : null}
    </StyledInput>
  )
}

export const DateField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const showError = meta.touched && meta.error
  return (
    <StyledInput error={showError}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <DatePicker {...field} {...props} selected={new Date()} />
      {showError ? <ErrorMessage>Error: {meta.error}</ErrorMessage> : null}
    </StyledInput>
  )
}

export const TitleField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const showError = meta.touched && meta.error
  return (
    <StyledInput error={showError}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TitleInput {...field} {...props} type="text" />
      {showError ? <ErrorMessage>Error: {meta.error}</ErrorMessage> : null}
    </StyledInput>
  )
}

export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const showError = meta.touched && meta.error
  return (
    <StyledInput error={showError}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextAreaInput {...field} {...props} />
      {showError ? <ErrorMessage>Error: {meta.error}</ErrorMessage> : null}
    </StyledInput>
  )
}

export const UsernameField = ({ label, value, setFieldValue, ...props }) => {
  const [field, meta] = useField(props)
  const showError = meta.touched && meta.error

  const handleChange = (name, value) => {
    if (value) {
      setFieldValue(name, value.toLowerCase())
    }
  }

  return (
    <StyledInput error={showError}>
      <Label htmlFor={props.id || props.name}>
        Username (plynth.com/{value || 'username'})
      </Label>
      <TextInput
        {...field}
        {...props}
        onChange={handleChange}
        value={value}
        name={props.name}
      />
      {showError ? <ErrorMessage>Error: {meta.error}</ErrorMessage> : null}
    </StyledInput>
  )
}

const StyledCheckboxInput = styled.div`
  color: ${props =>
    props.error ? theme.palette.error.main : theme.palette.secondary.main};
  border-color: ${props =>
    props.error ? theme.palette.error.main : theme.palette.secondary.main};
`

const CheckButtonInput = styled.button`
  width: 20px;
  height: 20px;
  font: inherit;
  color: white;
  border: 1px solid;
  border-color: inherit;
  background: ${theme.palette.background.input};
  text-align: left;
  padding: 0;
  margin-right: 0.5rem;
  &:focus {
    background: white;
    color: ${theme.palette.background.input};
    border-radius: 0px;
    outline: 1px solid ${theme.palette.primary.main};
    border: 1px solid ${theme.palette.primary.main};
`

const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3;
`

export const Checkmark = () => {
  return (
    <CheckIcon viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </CheckIcon>
  )
}

export const CheckButton = ({ label, checked, onClick, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props)
  const showError = meta.touched && meta.error

  const handleClick = event => {
    event.preventDefault()
    onClick()
  }

  return (
    <StyledCheckboxInput error={showError} style={{ marginBottom: '0.6rem' }}>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <StyledCheckboxInput error={showError}>
            {checked ? (
              <CheckButtonInput
                onClick={handleClick}
                style={{ background: theme.palette.secondary.main }}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9.35714L8.07549 14L17 4"
                    stroke="black"
                    strokeWidth="3"
                  />
                </svg>
              </CheckButtonInput>
            ) : (
              <CheckButtonInput onClick={handleClick}></CheckButtonInput>
            )}
          </StyledCheckboxInput>
        </Grid>
        <Grid item xs={11}>
          <StyledCheckboxInput error={showError}>
            <Label htmlFor={props.id || props.name}>{label}</Label>
          </StyledCheckboxInput>
        </Grid>
      </Grid>
      {showError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </StyledCheckboxInput>
  )
}

// const StyledAutocomplete = styled(Autocomplete)`
//   color: ${props =>
//     props.error ? theme.palette.error.main : theme.palette.secondary.main};
//   border-color: ${props =>
//     props.error ? theme.palette.error.main : theme.palette.secondary.main};
//   width: 100%;
//   font: inherit;
//   color: white;
//   border: 1px solid;
//   border-color: inherit;
//   background: #1b1d1b;
//   padding: 0.2rem 0.75rem 0.4rem 0.75rem;
//   margin: 0rem 0rem 1rem 0rem;
// `

// const AutocompleteField = ({ label, ...props }) => {
//   const [field, meta] = useField(props)
//   const showError = meta.touched && meta.error
//   return (
//     <StyledAutocomplete error={showError}>
//       <Label htmlFor={props.id || props.name}>{label}</Label>
//       <Autocomplete {...props} />
//       {showError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
//     </StyledAutocomplete>
//   )
// }

// const CheckboxInput = styled.div`
//   color: white;
//   border: 1px solid;
//   border-color: ${props =>
//     props.error ? theme.palette.error.main : theme.palette.secondary.main};
//   background: ${props => (props.checked ? 'salmon' : '#1b1d1b')};
//   width: 1.2rem;
//   height: 1.2rem;
//   margin: 0rem 0.5rem 1rem 0rem;
//   transition: all 150ms;

//   ${HiddenCheckbox}:focus + & {
//     box-shadow: 0 0 0 3px pink;
//   }
//   ${Icon} {
//     visibility: ${props => (props.checked ? 'visible' : 'hidden')};
//   }
// `

// const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
//   border: 0;
//   clip: rect(0 0 0 0);
//   clippath: inset(50%);
//   height: 1px;
//   margin: -1px;
//   overflow: hidden;
//   padding: 0;
//   position: absolute;
//   white-space: nowrap;
//   width: 1px;
// `

// const Icon = styled.svg`
//   fill: none;
//   stroke: white;
//   stroke-width: 2px;
// `

// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   return inputLength === 0 ? [] : users.filter(user =>
//     user.username.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };

// const getSuggestionValue = suggestion => suggestion.name

// const renderSuggestion = suggestion => (
//   <div>
//     {suggestion.name}
//   </div>
// );

export const LinkBarRow = ({ left, right }) => {
  return (
    <BarRow container justify="space-between">
      <Grid item>{left}</Grid>
      <Grid item>{right}</Grid>
    </BarRow>
  )
}
