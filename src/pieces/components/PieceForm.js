import React, { useState, useEffect } from 'react'
// import { useForm, Controller } from 'react-hook-form'
import { Grid, Box, Typography, Button } from '@material-ui/core'
import { Formik, Form, FieldArray, useField } from 'formik'
import * as Yup from 'yup'

import styled from 'styled-components'
import theme from '../../theme'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const { REACT_APP_BACKEND_URL } = process.env
const ASSET_URL = process.env.REACT_APP_ASSET_URL

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

const TextField = ({ label, ...props }) => {
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

const TitleField = ({ label, ...props }) => {
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

const TextArea = ({ label, ...props }) => {
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

// const TextArea = ({ label, ...props }) => {
//   const [field, meta] = useField(props)
//   const showError = meta.touched && meta.error
//   return (
//     <StyledTextInput error={showError}>
//       <Label htmlFor={props.id || props.name}>{label}</Label>

//       {showError ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
//     </StyledTextInput>
//   )
// }

// const StyledField = styled(Field)`
//   width: 100%;
//   font: inherit;
//   color: inherit;
//   border: 1px solid ${theme.palette.secondary.main};
//   background: #1b1d1b;
//   padding: 0.2rem 0.75rem 0.4rem 0.75rem;
//   margin: 0rem 0rem 1rem 0rem;
// `

const BarRow = styled(Grid)`
  background: ${theme.palette.secondary.main};
  padding-left: 10px;
  padding-right: 10px;
  color: ${theme.palette.background.paper};
  align-content: center;
`

const BarTitle = styled(Grid)`
  font-weight: bold;
`

const FieldSet = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
  margin-bottom: 1em;
`

const PieceForm = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [imageFilePath, setImageFilePath] = useState()

  // const { register, handleSubmit, watch, errors } = useForm()

  const pieceId = props.pieceId

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    creatorDemo: '',
    links: [],
  })

  useEffect(() => {
    const fetchPiece = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`
        )
        const {
          title,
          description,
          creatorDemo,
          links,
          awsId,
          ext,
        } = responseData.piece
        setImageFilePath(`${awsId}.${ext}`)
        setInitialValues({
          title,
          description,
          creatorDemo: creatorDemo || '',
          links,
        })
      } catch (err) {
        console.log(err)
      }
    }
    if (!!pieceId) {
      fetchPiece()
    }
  }, [sendRequest, pieceId])

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(32, 'Must be 32 characters or less')
      .required('Required'),
    description: Yup.string(),
    creatorDemo: Yup.string(),
    links: Yup.array().of(
      Yup.object({
        name: Yup.string()
          .max(32, 'Must be 32 characters or less')
          .required('Required'),
        url: Yup.string().url('Must be a valid URL').required('Required'),
      })
    ),
  })

  return (
    <React.Fragment>
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
      >
        {({ values, isValid }) => (
          <Form>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <ImageBox>
                      {imageFilePath ? (
                        <Image
                          src={`${ASSET_URL}/${imageFilePath}`}
                          alt="Preview"
                        />
                      ) : (
                        <LoadingSpinner asOverlay />
                      )}
                    </ImageBox>
                  </Grid>
                  <Grid item xs={8}>
                    <TitleField name="title" label="Title" type="text" />
                    <TextField name="creatorDemo" label="Creator" type="text" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextArea name="description" label="Description" type="text" />
              </Grid>
              <FieldArray name="links">
                {({ insert, remove, push }) => (
                  <React.Fragment>
                    <Grid item>
                      {values.links.length > 0 &&
                        values.links.map((link, index) => (
                          <FieldSet container direction="column" key={index}>
                            <BarRow
                              container
                              justify="space-between"
                              alignItems="center"
                            >
                              <BarTitle>
                                <Typography color="inherit">Link</Typography>
                              </BarTitle>
                              <Grid>
                                <Button
                                  color="inherit"
                                  onClick={() => remove(index)}
                                >
                                  Remove X
                                </Button>
                              </Grid>
                            </BarRow>
                            <Grid item>
                              <Box margin="1rem">
                                <TextField
                                  label="URL"
                                  name={`links.${index}.url`}
                                  type="url"
                                />
                              </Box>
                            </Grid>
                            <Grid item>
                              <Box margin="1rem">
                                <TextField
                                  name={`links.${index}.name`}
                                  label="Link Text"
                                  type="text"
                                />
                              </Box>
                            </Grid>
                          </FieldSet>
                        ))}
                      <ActionButton
                        type="button"
                        onClick={() => push({ name: '', url: '' })}
                        label="Add Link"
                        color="secondary"
                      />
                    </Grid>
                  </React.Fragment>
                )}
              </FieldArray>
              <Grid item>
                <ActionButton type="submit" label="Save" disabled={!isValid} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  )
}

export default PieceForm
