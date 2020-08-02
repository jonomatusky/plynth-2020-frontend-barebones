import React from 'react'
// import { useForm, Controller } from 'react-hook-form'
import { Grid } from '@material-ui/core'
import { useField } from 'formik'

import styled from 'styled-components'
import theme from '../../../theme'

const ImageBox = styled.div``

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const StyledTextInput = styled.div`
  color: ${props =>
    props.error ? theme.palette.error.main : theme.palette.secondary.main};
  border-color: ${props =>
    props.error ? theme.palette.error.main : theme.palette.secondary.main};
`

const Label = styled.label`
  color: inherit;
`

const TextInput = styled.input`
  width: 100%;
  font: inherit;
  color: white;
  border: 1px solid;
  border-color: inherit;
  background: #1b1d1b;
  padding: 0.2rem 0.75rem 0.4rem 0.75rem;
  margin: 0rem 0rem 1rem 0rem;
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
  border-color: inherit;
  resize: none;
  background: #1b1d1b;
  padding: 0.2rem 0.75rem 0.4rem 0.75rem;
  margin: 0rem 0rem 1rem 0rem;
`

const ErrorMessage = styled.div`
  color: inherit;
`

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const showError = meta.touched && meta.error
  return (
    <StyledTextInput error={showError}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextInput {...field} {...props} />
      {showError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </StyledTextInput>
  )
}

export const TitleField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const showError = meta.touched && meta.error
  return (
    <StyledTextInput error={showError}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TitleInput {...field} {...props} />
      {showError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </StyledTextInput>
  )
}

export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const showError = meta.touched && meta.error
  return (
    <StyledTextInput error={showError}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextAreaInput {...field} {...props} />
      {showError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </StyledTextInput>
  )
}

export const BarRow = styled(Grid)`
  background: ${theme.palette.secondary.main};
  padding-left: 10px;
  padding-right: 10px;
  color: ${theme.palette.background.paper};
  align-content: center;
`

export const BarTitle = styled(Grid)`
  font-weight: bold;
`

export const FieldSet = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
  margin-bottom: 1em;
`
