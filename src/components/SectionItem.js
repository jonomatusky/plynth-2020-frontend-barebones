import React, { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import {
  Grid,
  Button,
  IconButton,
  Typography,
  Box,
  Accordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails,
  withStyles,
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import TextField from './TextField'
import UserAutocomplete from './UserAutocomplete'
import theme from 'theme'
import useUserStore from 'hooks/store/use-user-store'

const AccordionSummary = withStyles({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.default,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    // marginBottom: -1,
    minHeight: theme.spacing(2),
    '&$expanded': {
      minHeight: theme.spacing(2),
    },
  },
  content: {
    '&$expanded': {
      margin: `6px 0`,
    },
    margin: `6px 0`,
  },
  expanded: {},
})(MuiAccordionSummary)

const SectionItem = ({
  control,
  section,
  index,
  remove: removeSection,
  move,
  first,
  last,
  errors,
  expanded,
  handleChange,
}) => {
  const { users } = useUserStore()

  const { fields, remove, append } = useFieldArray({
    control,
    name: `sections[${index}].links`,
    keyName: 'identifier',
  })

  const RemoveButton = () => {
    return (
      <Button
        variant="text"
        color="inherit"
        onClick={() => removeSection(index)}
      >
        <Typography>Remove</Typography>
        <ClearIcon fontSize="small" />
      </Button>
    )
  }

  const UpButton = () => {
    return (
      <IconButton
        variant="text"
        color="inherit"
        onClick={() => move(index, index - 1)}
        size="small"
        disabled={first === true}
      >
        <ExpandLessIcon />
      </IconButton>
    )
  }

  const DownButton = () => {
    return (
      <IconButton
        variant="text"
        color="inherit"
        onClick={() => {
          move(index, index + 1)
        }}
        size="small"
        disabled={last === true}
      >
        <ExpandMoreIcon />
      </IconButton>
    )
  }

  const printHeader = section => {
    const title = section.type.split('.').join(' of ')
    if (section.type === 'text') {
      return 'Text Section'
    } else if (section.title) {
      return `Title: ${section.title}`
    } else if (section.link) {
      return `Link${section.link.text ? ': ' + section.link.text : ''}`
    } else {
      return title.charAt(0).toUpperCase() + title.slice(1)
    }
  }

  useEffect(() => {
    if (section.type === 'list.links' && fields.length === 0) {
      append({ text: '', url: '' })
    }
  }, [append, fields.length, section.type])

  return (
    <Grid item xs={12}>
      <Accordion
        square
        expanded={expanded}
        onChange={handleChange(section.identifier)}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={{ color: theme.palette.background.default }}
            />
          }
        >
          <Typography>
            <b>{printHeader(section)}</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              {section.type === 'text' && (
                <TextField
                  control={control}
                  name={`sections[${index}].text`}
                  label="Text Section"
                  defaultValue={section.text}
                  error={Boolean(errors.text)}
                  helperText={errors.text?.message}
                />
              )}
              {section.type === 'title' && (
                <TextField
                  control={control}
                  name={`sections[${index}].title`}
                  label="Section Title"
                  defaultValue={section.title}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
              {section.type === 'link' && (
                <>
                  <Grid item>
                    <TextField
                      control={control}
                      label="URL"
                      name={`sections[${index}].link.url`}
                      type="url"
                      defaultValue={section.link.url}
                      error={Boolean((errors.link || {}).url)}
                      helperText={((errors.link || {}).url || {}).message}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      control={control}
                      name={`sections[${index}].link.text`}
                      label="Button Text"
                      type="text"
                      defaultValue={section.link.text}
                      error={Boolean((errors.link || {}).text)}
                      helperText={((errors.link || {}).text || {}).message}
                    />
                  </Grid>
                </>
              )}
              {section.type === 'list.links' && (
                <>
                  <>
                    {fields.map((field, k) => {
                      return (
                        <Grid item xs={12} key={field.identifier}>
                          <Box display="flex">
                            <Box flexGrow={1} mr={0.5}>
                              <TextField
                                control={control}
                                label="URL"
                                name={`sections[${index}].links[${k}].url`}
                                type="url"
                                defaultValue={field.url}
                                error={Boolean(
                                  ((errors.links || [])[k] || {}).url
                                )}
                                helperText={
                                  (((errors.links || [])[k] || {}).url || {})
                                    .message
                                }
                              />
                            </Box>
                            <Box flexGrow={1} ml={0.5}>
                              <TextField
                                control={control}
                                name={`sections[${index}].links[${k}].text`}
                                label="Text"
                                type="text"
                                defaultValue={field.text}
                                error={Boolean(
                                  ((errors.links || [])[k] || {}).text
                                )}
                                helperText={
                                  (((errors.links || [])[k] || {}).text || {})
                                    .message
                                }
                              />
                            </Box>
                            <Box mt={5}>
                              <IconButton
                                disabled={k === 0}
                                size="small"
                                edge="end"
                                onClick={() => remove(k)}
                              >
                                <ClearIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </Grid>
                      )
                    })}
                  </>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      onClick={() => append({ url: '', text: '' })}
                    >
                      <b>+ Add Link</b>
                    </Button>
                  </Grid>
                </>
              )}
              {section.type === 'list.users' && (
                <Grid item xs={12}>
                  <UserAutocomplete
                    control={control}
                    options={users}
                    name={`sections[${index}].users`}
                    defaultValue={section.users}
                    // error={Boolean(((errors.links || [])[k] || {}).url)}
                    // helperText={
                    //   (((errors.links || [])[k] || {}).url || {}).message
                    // }
                  />
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <Box maxWidth="8rem" textOverflow="ellipsis">
                        <Typography noWrap>Order</Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <DownButton />
                    </Grid>
                    <Grid item>
                      <Typography>{index + 1}</Typography>
                    </Grid>
                    <Grid item>
                      <UpButton />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <RemoveButton />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}

export default SectionItem
