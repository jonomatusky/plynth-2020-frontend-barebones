import React, { useState, useEffect } from 'react'
// import { useForm, Controller } from 'react-hook-form'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ActionButton from '../../shared/components/ui/ActionButton'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

import { Form1, Form2 } from './FormStages'

const { REACT_APP_BACKEND_URL } = process.env
const ASSET_URL = process.env.REACT_APP_ASSET_URL

const UserForm = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  // const [imageFilePath, setImageFilePath] = useState(null)
  const [imageUpload, setImageUpload] = useState(null)
  const [avatarLink, setAvatarLink] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
    displayName: '',
    bio: '',
    email: '',
    avatar: '',
    links: [],
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Please provide your email address'),
    password: Yup.string().min(
      5,
      'Password must be at least 5 characters long'
    ),
    passwordConfirmation: Yup.string()
      .min(5, 'Password must be at least 5 characters long')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
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
    bio: Yup.string(),
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
    console.log('submitting')
    try {
      if (imageUpload) {
        if (imageUpload.isValid) {
          const awsRes = await sendRequest(
            imageUpload.signedUrl,
            'PUT',
            imageUpload.image,
            {},
            false
          )
          if (awsRes.status === 200) {
            props.onSubmit(values)
          }
        }
      } else {
        console.log('submitting form values')
        props.onSubmit(values)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const FormData = ({ values, setFieldValue }) => {
    switch (currentPage) {
      case 1:
        return <Form1 values={values} />
      case 2:
        return (
          <Form2
            values={values}
            setFieldValue={setFieldValue}
            setImageUpload={setImageUpload}
          />
        )
      default:
        return <Form1 />
    }
  }

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Formik
          enableReinitialize="true"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isValid, setFieldValue }) => (
            <Form>
              <Grid container direction="column" spacing={1}>
                <Box height="1rem"></Box>
                <FormData values={values} setFieldValue={setFieldValue} />
                <Box height="4vh"></Box>
                <Grid item>
                  <ActionButton
                    type="submit"
                    label="Save"
                    loading={isLoading}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

export default UserForm
