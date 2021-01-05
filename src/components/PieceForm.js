import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import {
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core'

import { useUserStore } from 'hooks/store/use-user-store'
import TextField from './TextField'
import SectionItem from './SectionItem'
import SectionButton from './SectionButton'
import { Image, ImageBox } from './FormElements'
import ActionButton from './ActionButton'
import { fetchUser } from 'redux/userSlice'
import LinkList from './LinkList'

const ASSET_URL = process.env.REACT_APP_ASSET_URL

const PieceForm = ({
  piece,
  imageFilepath,
  onSubmit,
  isLoading,
  submitLabel,
}) => {
  const { fetchUserList } = useUserStore()

  const {
    title,
    description,
    links,
    awsId,
    ext,
    isDirect,
    directLink,
    sections,
    generation,
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

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(48, 'Must be 48 characters or less')
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
    sections: Yup.array().of(
      Yup.object({
        type: Yup.string(),
        title: Yup.string().when('type', {
          is: value => value === 'title',
          then: Yup.string().required('Required'),
          otherwise: Yup.string(),
        }),
        text: Yup.string().when('type', {
          is: value => value === 'text',
          then: Yup.string().required('Required'),
          otherwise: Yup.string(),
        }),
        link: Yup.object().when('type', {
          is: value => value === 'link',
          then: Yup.object().shape({
            text: Yup.string()
              .max(32, 'Must be 32 characters or less')
              .required('Required'),
            url: Yup.string()
              .url(`Must be a valid URL. Include http:// or https://`)
              .required('Required'),
          }),
          otherwise: Yup.object(),
        }),
        links: Yup.array().when('type', {
          is: value => value === 'list.links',
          then: Yup.array().of(
            Yup.object({
              text: Yup.string()
                .max(32, 'Must be 32 characters or less')
                .required('Required'),
              url: Yup.string()
                .url(`Must be a valid URL. Include http:// or https://`)
                .required('Required'),
            })
          ),
        }),
      })
    ),
  })

  const { register, handleSubmit, errors, control, watch } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
    shouldUnregister: false,
  })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'sections',
    keyName: 'identifier',
  })

  const watchDirect = watch('isDirect', isDirect)

  // const values = watch()
  // console.log(values)

  const [expanded, setExpanded] = useState(false)
  const [sectionsLength, setSectionsLength] = useState(sections.length)

  const handleChange = identifier => (event, isExpanded) => {
    setExpanded(isExpanded ? identifier : false)
    console.log(expanded)
  }

  const handleAppend = data => {
    append(data)
  }

  useEffect(() => {
    const handleAppend = () => {
      setExpanded(fields[fields.length - 1].identifier)
      setSectionsLength(fields.length)
    }
    const handleRemove = () => {
      setSectionsLength(fields.length)
    }
    if (fields.length !== sectionsLength) {
      if (fields.length > sectionsLength) {
        handleAppend()
      } else {
        handleRemove()
      }
    }
  }, [fields, sectionsLength])

  useEffect(() => {
    console.log(sections.map(section => section.type))
    if (sections.map(section => section.type).includes('list.users')) {
      fetchUserList()
    }
  }, [sections, fetchUserList])

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title (Required)"
            control={control}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
        </Grid>
        <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Typography>
                Enter your direct link. Leave blank to direct users to your
                profile.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="directLink"
                label="Link"
                control={control}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />
            </Grid>
          </>
        ) : (
          <>
            {!watchDirect && (
              <>
                {!!description && (
                  <Grid item>
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
                )}
                {!!links && links.length > 0 && (
                  <Grid item>
                    <LinkList control={control} links={links} />
                  </Grid>
                )}
                <Box height="1rem" />
                {fields.map((section, index) => {
                  return (
                    <SectionItem
                      control={control}
                      key={section.identifier}
                      register={register}
                      section={section}
                      index={index}
                      move={move}
                      remove={remove}
                      errors={(errors.sections || [])[index] || {}}
                      expanded={
                        expanded === section.identifier || expanded === 'last'
                      }
                      handleChange={handleChange}
                      first={index === 0}
                      last={index === fields.length - 1}
                    />
                  )
                })}
                <Grid item xs={12}>
                  <SectionButton append={handleAppend} />
                </Grid>

                {/* <Grid item>
                  <LinksList links={values.links} />
                </Grid> */}
              </>
            )}
          </>
        )}
        <Box height="1rem"></Box>
        <Grid item xs={12}>
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
