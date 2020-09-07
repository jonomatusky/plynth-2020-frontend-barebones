import React, { useState, useEffect } from 'react'
// import { useForm, Controller } from 'react-hook-form'
import { Grid, Box, Typography, Button } from '@material-ui/core'
import { Formik, Form, FieldArray, useField } from 'formik'
import * as Yup from 'yup'

import {
  TextField,
  TitleField,
  FieldSet,
  TextArea,
  BarTitle,
  Image,
  ImageBox,
  CheckButton,
} from '../../shared/components/FormElements/FormElements'

import { BarRow } from '../../shared/components/UIElements/CardSections'

import styled from 'styled-components'
import theme from '../../theme'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const { REACT_APP_BACKEND_URL } = process.env
const ASSET_URL = process.env.REACT_APP_ASSET_URL

const PieceForm = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [imageFilePath, setImageFilePath] = useState(null)
  const [users, setUsers] = useState([])

  const pieceId = props.pieceId

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    creator: '',
    links: [],
    isDirect: false,
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
          isDirect,
        } = responseData.piece
        setImageFilePath(`${awsId}.${ext}`)
        setInitialValues({
          title,
          description,
          ownerUsername: owner.username,
          links,
          isDirect,
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
                    <TitleField name="title" label="Title" />
                  </Grid>
                  <Grid item>
                    <TextArea name="description" label="Description" />
                  </Grid>
                  <Grid item>
                    <CheckButton
                      onClick={() =>
                        setFieldValue('isDirect', !values.isDirect)
                      }
                      name="isDirect"
                      label="Skip this page and take users to your profile?"
                      checked={values.isDirect}
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
                                alignItems="stretch"
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
                                <Grid container justify="center">
                                  <Grid item xs={11}>
                                    <Grid container direction="column">
                                      <Box height="0.5rem" />
                                      <Grid item>
                                        <TextField
                                          label="URL"
                                          name={`links.${index}.url`}
                                          type="url"
                                        />
                                      </Grid>
                                      <Grid item>
                                        <TextField
                                          name={`links.${index}.name`}
                                          label="Link Text"
                                          type="text"
                                        />
                                      </Grid>
                                      <Box height="0.5rem" />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </FieldSet>
                            ))}
                          <ActionButton
                            type="button"
                            onClick={() => push({ name: '', url: '' })}
                            label="+ Add Link"
                            variant="text"
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
