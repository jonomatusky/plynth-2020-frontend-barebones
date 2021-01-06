import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import ActionButton from './ActionButton'
import {
  TextField,
  TextArea,
  Image,
  ImageBox,
  CheckButton,
} from './FormElements'
import LinksList from './LinkList'

const ASSET_URL = process.env.REACT_APP_ASSET_URL

const PieceForm = ({
  piece,
  imageFilepath,
  onSubmit,
  isLoading,
  submitLabel,
}) => {
  const { title, description, links, awsId, ext, isDirect, directLink } =
    piece || {}

  imageFilepath = imageFilepath || (awsId && ext ? `${awsId}.${ext}` : null)

  const initialValues = {
    title: title || '',
    description: description || '',
    links: links || [],
    isDirect: isDirect || false,
    directLink: directLink || '',
  }

  const handleSubmit = async values => {
    onSubmit(values)
  }

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(32, 'Must be 32 characters or less')
      .required('Required'),
    description: Yup.string(),
    directLink: Yup.string().url(
      `Must be a valid URL. Include http:// or https://`
    ),
    links: Yup.array().of(
      Yup.object({
        name: Yup.string()
          .max(32, 'Must be 32 characters or less')
          .required('Required'),
        url: Yup.string()
          .url(`Must be a valid URL. Include http:// or https://`)
          .required('Required'),
      })
    ),
  })

  return (
    <>
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container justify="center">
                  <Grid item>
                    <ImageBox>
                      {imageFilepath && (
                        <Image
                          src={`${ASSET_URL}/${imageFilepath}`}
                          alt="Preview"
                        />
                      )}
                    </ImageBox>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField name="title" label="Title (Required)" />
              </Grid>
              <Grid item>
                <CheckButton
                  onClick={() => {
                    setFieldValue('isDirect', !values.isDirect)
                    setFieldValue('directLink', '')
                  }}
                  name="isDirect"
                  label="Take users directly to my profile or content"
                  checked={values.isDirect}
                />
              </Grid>
              {values.isDirect ? (
                <Grid item>
                  <TextField
                    name="directLink"
                    label="Enter your direct link. Otherwise users will be directed to your profile."
                  />
                </Grid>
              ) : (
                <>
                  {!values.isDirect && (
                    <>
                      <Grid item>
                        <TextArea name="description" label="Description" />
                      </Grid>
                      <Box height="1rem" />
                      <Grid item>
                        <LinksList links={values.links} />
                      </Grid>
                    </>
                  )}
                </>
              )}
              <Box height="1rem"></Box>
              <Grid item>
                <ActionButton
                  type="submit"
                  label={submitLabel || `Save & Close`}
                  loading={isLoading}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default PieceForm
