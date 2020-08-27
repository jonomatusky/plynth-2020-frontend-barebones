import React, { useState, useEffect } from 'react'
// import { useForm, Controller } from 'react-hook-form'
import { Grid, Box, Typography, Button } from '@material-ui/core'
import { Formik, Form, FieldArray, useField } from 'formik'
import * as Yup from 'yup'
import Autocomplete from 'react-autocomplete'

import styled from 'styled-components'
import theme from '../../theme'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const { REACT_APP_BACKEND_URL } = process.env
const ASSET_URL = process.env.REACT_APP_ASSET_URL

const ImageBox = styled.div`
  padding-top: 2rem;
`

const Image = styled.img`
  max-with: 100px;
  max-height: 150px;
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

const StyledAutocomplete = styled(Autocomplete)`
  color: ${props =>
    props.error ? theme.palette.error.main : theme.palette.secondary.main};
  border-color: ${props =>
    props.error ? theme.palette.error.main : theme.palette.secondary.main};
  width: 100%;
  font: inherit;
  color: white;
  border: 1px solid;
  border-color: inherit;
  background: #1b1d1b;
  padding: 0.2rem 0.75rem 0.4rem 0.75rem;
  margin: 0rem 0rem 1rem 0rem;
`

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

const PieceForm = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [imageFilePath, setImageFilePath] = useState(null)
  const [users, setUsers] = useState([])

  // const { register, handleSubmit, watch, errors } = useForm()

  const pieceId = props.pieceId

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    creator: '',
    links: [],
  })

  useEffect(() => {
    if (!!props.imageFilePath) {
      setImageFilePath(props.imageFilePath)
    }
  }, [props])

  useEffect(() => {
    const fetchPiece = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`
        )
        const {
          title,
          description,
          owner,
          links,
          awsId,
          ext,
        } = responseData.piece
        setImageFilePath(`${awsId}.${ext}`)
        setInitialValues({
          title,
          description,
          ownerUsername: owner.username,
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`${REACT_APP_BACKEND_URL}/users`)
        setUsers(responseData.users)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUsers()
  }, [sendRequest, pieceId])

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

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(32, 'Must be 32 characters or less')
      .required('Required'),
    description: Yup.string(),
    creator: Yup.string(),
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
    <Box>
      <Grid container justify="center">
        <Grid item xs={11}>
          <Formik
            enableReinitialize="true"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}
          >
            {({ values, isValid, setFieldValue }) => (
              <Form>
                <Grid container direction="column" spacing={1}>
                  <Grid container justify="center">
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
                  <Grid item>
                    <TitleField name="title" label="Title" type="text" />
                  </Grid>
                  <Grid item>
                    <Autocomplete
                      getItemValue={item => item.username}
                      items={users}
                      wrapperStyle={{}}
                      shouldItemRender={(item, value) =>
                        item.username
                          .toLowerCase()
                          .indexOf(value.toLowerCase()) > -1
                      }
                      renderInput={props => {
                        return (
                          <StyledTextInput type="text">
                            <Label htmlFor="Owner">Owner</Label>
                            <TextInput
                              name="ownerUsername"
                              type="text"
                              {...props}
                            />
                          </StyledTextInput>
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
                      value={values.ownerUsername}
                      onChange={e =>
                        setFieldValue('ownerUsername', e.target.value)
                      }
                      onSelect={val => setFieldValue('ownerUsername', val)}
                    />
                  </Grid>
                  <Grid item>
                    <TextArea
                      name="description"
                      label="Description"
                      type="text"
                    />
                  </Grid>
                  <FieldArray name="links">
                    {({ insert, remove, push }) => (
                      <React.Fragment>
                        <Grid item>
                          {values.links.length > 0 &&
                            values.links.map((link, index) => (
                              <FieldSet
                                container
                                direction="column"
                                key={index}
                              >
                                <BarRow
                                  container
                                  justify="space-between"
                                  alignItems="center"
                                >
                                  <BarTitle>
                                    <Typography color="inherit">
                                      Link
                                    </Typography>
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
                    <ActionButton
                      type="submit"
                      label="Save"
                      disabled={!isValid}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PieceForm
