import React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import {
  Grid,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core'

import SectionItem from './SectionItem'
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
  const {
    title,
    description,
    links,
    awsId,
    ext,
    isDirect,
    directLink,
    sections,
  } = piece || {}

  imageFilepath = imageFilepath || (awsId && ext ? `${awsId}.${ext}` : null)

  const defaultValues = {
    title: title || '',
    description: description || '',
    links: links || [],
    isDirect: isDirect || false,
    directLink: directLink || '',
    sections: sections || [],
  }

  console.log(isDirect)

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

  const { register, handleSubmit, errors, getValues, control, watch } = useForm(
    {
      mode: 'onBlur',
      resolver: yupResolver(validationSchema),
      defaultValues,
    }
  )

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'sections',
    }
  )

  const watchDirect = watch('isDirect', isDirect)

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
            control={
              <Controller
                render={props => (
                  <Checkbox
                    onChange={e => props.onChange(e.target.checked)}
                    checked={props.value}
                  />
                )}
                name="isDirect"
                type="checkbox"
                control={control}
              />
            }
            label="Take users directly to my profile or content"
          />
        </Grid>
        {!!watchDirect ? (
          <>
            <Grid item>
              <Typography>
                Enter your direct link. Leave blank to direct users to your
                profile.
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                inputRef={register}
                name="directLink"
                label="Link"
              />
            </Grid>
          </>
        ) : (
          <>
            {!watchDirect && (
              <>
                {/* <Grid item>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    inputRef={register}
                    name="description"
                    label="Description"
                  />
                </Grid>
                <Box height="1rem" /> */}
                {sections.map(section => {
                  return <SectionItem section={section} />
                })}

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
