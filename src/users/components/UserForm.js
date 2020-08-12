import React, { useState, useEffect } from 'react'
// import { useForm, Controller } from 'react-hook-form'
import { Grid, Box, Typography, Button } from '@material-ui/core'
import { Formik, Form, FieldArray, isValid } from 'formik'
import * as Yup from 'yup'

import {
  TextField,
  FieldSet,
} from '../../shared/components/FormElements/FormElements'

import styled from 'styled-components'
import theme from '../../theme'

import { ImageBox } from '../../shared/components/FormElements/FormElements'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import {
  PieceBox,
  BarRow,
} from '../../shared/components/UIElements/CardSections'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const { REACT_APP_BACKEND_URL } = process.env
const ASSET_URL = process.env.REACT_APP_ASSET_URL

const UserForm = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  // const [imageFilePath, setImageFilePath] = useState(null)
  const [user, setUser] = useState({})
  const [imageUpload, setImageUpload] = useState({})
  const [avatarLink, setAvatarLink] = useState()

  // const user = props.user

  const userId = props.userId

  const [initialValues, setInitialValues] = useState({
    username: '',
    displayName: '',
    avatar: '',
    links: [],
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/users/${userId}`
        )
        const {
          username,
          displayName,
          avatar,
          avatarLink,
          bio,
          links,
        } = responseData.user
        setInitialValues({
          username,
          displayName,
          avatar,
          links,
        })
        setAvatarLink(avatarLink)
      } catch (err) {
        console.log(err)
      }
    }
    if (!!userId) {
      fetchUser()
    }
  }, [sendRequest, userId])

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, 'Username must be at least 6 characters long')
      .max(30, 'Username must be no longer than 30 characters')
      .matches(
        /^[a-z0-9_.]*$/,
        'Username must only contain lowercase characters a-z, numbers, . and _'
      )
      .matches(
        /^(?!.*?\.\.).*?$/,
        'Username cannot contain two consecutive (.)'
      )
      .matches(/^((?!\.).*(?!\.))$/, 'Username cannot start or end with (.)')
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

  const handleSubmit = async values => {
    if (imageUpload.isValid) {
      try {
        const awsRes = await sendRequest(
          imageUpload.signedUrl,
          'PUT',
          imageUpload.image,
          {},
          false
        )
        console.log('awsRes: ' + awsRes)
        if (awsRes.status === 200) {
          props.onSubmit(values)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Formik
      enableReinitialize="true"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isValid, setFieldValue }) => (
        <Form>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <ImageUpload
                previewUrl={avatarLink}
                onInput={(signedUrl, imageData, image, isValid) => {
                  setFieldValue('avatar', `${imageData.id}.${imageData.ext}`)
                  setImageUpload({ signedUrl, imageData, image, isValid })
                }}
              />
            </Grid>
            <Grid item>
              <TextField name="displayName" label="Name" type="text" />
            </Grid>
            <Grid item>
              <TextField name="username" label="Username" type="text" />
            </Grid>
            <FieldArray name="links">
              {({ insert, remove, push }) => (
                <React.Fragment>
                  <Grid item>
                    {values.links.length > 0 &&
                      values.links.map((link, index) => (
                        <FieldSet container direction="column" key={index}>
                          <BarRow
                            title="Link"
                            buttonLabel="Remove X"
                            onClick={() => remove(index)}
                          />
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
                      label="+ Add A Link"
                      variant="text"
                    />
                  </Grid>
                </React.Fragment>
              )}
            </FieldArray>
            <Grid item>
              <ActionButton type="submit" label="Save" />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default UserForm
