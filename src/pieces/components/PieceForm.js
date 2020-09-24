import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'

import {
  TextField,
  TitleField,
  FieldSet,
  TextArea,
  Image,
  ImageBox,
  CheckButton,
  LinkBarRow,
} from '../../shared/components/forms/FormElements'

import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import ActionButton from '../../shared/components/ui/ActionButton'

const ASSET_URL = process.env.REACT_APP_ASSET_URL

const PieceForm = props => {
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const piece = props.piece
  const { id, title, description, links, awsId, ext, isDirect } = piece || {}

  const imageFilepath =
    props.imageFilepath || (awsId && ext ? `${awsId}.${ext}` : null)
  const initialValues = {
    title,
    description,
    links,
    isDirect,
  }

  const handleSubmit = async formData => {
    let url = piece ? `/pieces/${id}` : `/pieces`
    let method = piece ? 'PATCH' : 'POST'

    formData.images = [imageFilepath]

    try {
      const pieceData = { piece: formData }
      let response = await sendRequest(url, method, JSON.stringify(pieceData))
      props.onSubmit(response)
    } catch (err) {}
  }

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(32, 'Must be 32 characters or less')
      .required('Required'),
    description: Yup.string(),
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
    <>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
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
                  <Grid item>
                    <Grid container justify="center">
                      <Grid item>
                        <ImageBox>
                          <Image
                            src={`${ASSET_URL}/${imageFilepath}`}
                            alt="Preview"
                          />
                        </ImageBox>
                      </Grid>
                    </Grid>
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
                      label="Skip this page and take users directly to your profile?"
                      checked={values.isDirect}
                    />
                  </Grid>
                  <FieldArray name="links">
                    {({ insert, remove, push }) => (
                      <React.Fragment>
                        <Grid item>
                          {(values.links || []).map((link, index) => (
                            <FieldSet container direction="column" key={index}>
                              <LinkBarRow
                                title="Link"
                                buttonLabel="Remove X"
                                onClick={() => remove(index)}
                              />
                              <Grid container justify="center">
                                <Grid item xs={11}>
                                  <Grid
                                    container
                                    direction="column"
                                    spacing={1}
                                  >
                                    <Box height="1rem" />
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
                                    <Box height="1rem" />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </FieldSet>
                          ))}
                          <ActionButton
                            type="button"
                            onClick={() => push({ name: '', url: '' })}
                            label="+ Add A Link"
                            variant="text"
                            color="secondary"
                            loading={isLoading}
                          />
                        </Grid>
                      </React.Fragment>
                    )}
                  </FieldArray>
                  <Box height="1rem"></Box>
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
    </>
  )
}

export default PieceForm
