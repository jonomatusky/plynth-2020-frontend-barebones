import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Autocomplete from 'react-autocomplete'

import { setPiece } from '../../redux/piecesSlice'
import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import ActionButton from '../../shared/components/ui/ActionButton'
import {
  TextField,
  TextArea,
  Image,
  ImageBox,
  CheckButton,
  StyledInput,
  Label,
  TextInput,
} from '../../shared/components/forms/FormElements'
import LinksList from '../../shared/components/forms/LinkList'

const ASSET_URL = process.env.REACT_APP_ASSET_URL

const PieceForm = props => {
  const dispatch = useDispatch()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const piece = props.piece
  const { id, title, description, links, awsId, ext, isDirect, owner } =
    piece || {}

  const imageFilepath =
    props.imageFilepath || (awsId && ext ? `${awsId}.${ext}` : null)

  const initialValues = {
    title: title || '',
    ownerUsername: owner.username || '',
    description: description || '',
    links: links || [],
    isDirect: isDirect || false,
  }

  const handleSubmit = async formData => {
    let url = piece ? `/pieces/${id}` : `/pieces`
    let method = piece ? 'PATCH' : 'POST'

    formData.images = [imageFilepath]

    try {
      const pieceData = { piece: formData }
      let response = await sendRequest(url, method, pieceData)
      dispatch(setPiece(response))
      props.onSubmit(response)
    } catch (err) {
      console.log(err)
    }
  }

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(32, 'Must be 32 characters or less')
      .required('Required'),
    ownerUsername: Yup.string(),
    description: Yup.string(),
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
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
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
                <Autocomplete
                  getItemValue={item => item.username}
                  items={props.users}
                  wrapperStyle={{}}
                  shouldItemRender={(item, value) =>
                    item.username.toLowerCase().indexOf(value.toLowerCase()) >
                    -1
                  }
                  renderInput={props => {
                    return (
                      <StyledInput type="text">
                        <Label htmlFor="Owner">Owner</Label>
                        <TextInput
                          name="ownerUsername"
                          type="text"
                          {...props}
                        />
                      </StyledInput>
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
                  onChange={e => setFieldValue('ownerUsername', e.target.value)}
                  onSelect={val => setFieldValue('ownerUsername', val)}
                />
              </Grid>
              <Grid item>
                <CheckButton
                  onClick={() => setFieldValue('isDirect', !values.isDirect)}
                  name="isDirect"
                  label="Skip this page and take users directly to my profile"
                  checked={values.isDirect}
                />
              </Grid>
              <Grid item>
                <TextArea name="description" label="Description" />
              </Grid>
              <Box height="1rem" />
              <Grid item>
                <LinksList links={values.links} />
              </Grid>
              <Box height="1rem"></Box>
              <Grid item>
                <ActionButton
                  type="submit"
                  label={`Save & Close`}
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