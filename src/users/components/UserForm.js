import React, { useState, useEffect } from 'react'
// import { useForm, Controller } from 'react-hook-form'
import { Grid, Box, Typography, Button } from '@material-ui/core'
import {
  Formik,
  Form,
  FieldArray,
  isValid,
  setFieldValue,
  setFieldErrors,
} from 'formik'
import * as Yup from 'yup'

import styled from 'styled-components'
import theme from '../../theme'

import { ImageBox } from '../../shared/components/FormElements/FormElements'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const { REACT_APP_BACKEND_URL } = process.env
const ASSET_URL = process.env.REACT_APP_ASSET_URL

const PieceForm = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [imageFilePath, setImageFilePath] = useState(null)
  const [users, setUsers] = useState({})

  // const { register, handleSubmit, watch, errors } = useForm()

  const pieceId = props.pieceId

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    creatorDemo: '',
    links: [],
  })

  useEffect(() => {
    if (!!props.imageFilePath) {
      setImageFilePath(props.imageFilePath)
    }
  }, [props])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`${REACT_APP_BACKEND_URL}/users`)
        setUsers(responseData.users)
      } catch (err) {
        console.log(err)
      }
    }
  }, [sendRequest, pieceId])

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(30, 'Enter a name under 30 characters')
      .required('Required'),
    displayName: Yup.string()
      .max(30, 'Enter a name under 30 characters')
      .required('Required'),
    avatar: Yup.string(),
    links: Yup.array().of(
      Yup.object({
        name: Yup.string()
          .max(32, 'Must be 32 characters or less')
          .required('Required'),
        url: Yup.string().url('Must be a valid URL').required('Required'),
      })
    ),
  })

  const avatarHandler = async (signedUrl, imageData, image, fileIsValid) => {
    if (fileIsValid) {
      try {
        const awsRes = await sendRequest(signedUrl, 'PUT', image, {}, false)
        if (awsRes.status === 200) {
          setFieldValue('avatar', `${imageData.id}.${imageData.ext}`)
          sessionStorage.setItem('imageId', imageData.id)
          sessionStorage.setItem('imageExt', imageData.ext)
        }
      } catch (err) {
        console.log(err)
      }
    }
    return
  }

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
                    <ImageUpload />
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
