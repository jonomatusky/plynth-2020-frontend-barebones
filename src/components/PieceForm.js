import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import {
  Grid,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'

import { Image, ImageBox } from './FormElements'
import ActionButton from './ActionButton'

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

  const defaultValues = {
    title: title || '',
    description: description || '',
    links: links || [],
    isDirect: isDirect || false,
    directLink: directLink || '',
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

  const { register, handleSubmit, errors, getValues } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container justify="center">
            <Grid item>
              <ImageBox>
                {imageFilepath && (
                  <Image src={`${ASSET_URL}/${imageFilepath}`} alt="Preview" />
                )}
              </ImageBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            inputRef={register}
            name="title"
            label="Title (Required)"
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox inputRef={register} name="isDirect" />}
            label="Take users directly to my profile or content"
          />
        </Grid>
        {getValues().isDirect ? (
          <Grid item>
            <TextField
              inputRef={register}
              name="directLink"
              label="Enter your direct link. Otherwise users will be directed to your profile."
            />
          </Grid>
        ) : (
          <>
            {!getValues.isDirect && (
              <>
                <Grid item>
                  <TextField
                    inputRef={register}
                    name="description"
                    label="Description"
                  />
                </Grid>
                <Box height="1rem" />
                {/* <Grid item>
                  <LinksList links={values.links} />
                </Grid> */}
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
    </form>
  )
}

export default PieceForm
