import React from 'react'
import {
  Grid,
  Button,
  Typography,
  Box,
  Paper,
  Accordion,
  TextField,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const SectionItem = ({
  register,
  section,
  index,
  remove,
  move,
  first,
  last,
}) => {
  const RemoveButton = () => {
    return (
      <Button variant="text" color="inherit" onClick={() => remove(index)}>
        <Typography>Delete</Typography>
        <ClearIcon fontSize="small" />
      </Button>
    )
  }

  const UpButton = () => {
    return (
      <Button
        variant="text"
        color="inherit"
        onClick={() => move(index, index - 1)}
      >
        <ExpandLessIcon />
      </Button>
    )
  }

  const DownButton = () => {
    return (
      <Button
        variant="text"
        color="inherit"
        onClick={() => {
          move(index, index + 1)
        }}
      >
        <ExpandMoreIcon />
      </Button>
    )
  }

  const printHeader = string => {
    const title = string.split('.').join(' of ')
    return title.charAt(0).toUpperCase() + title.slice(1)
  }

  return (
    <Grid item>
      <Accordion>
        <AccordionSummary>
          <Typography>
            <b>{printHeader(section.type)}</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              {section.type === 'text' && (
                <TextField
                  fullWidth
                  variant="outlined"
                  name={`sections[${index}].text`}
                  label="Text Section"
                  multiline
                  rows={4}
                  InputRef={register}
                  defaultValue={section.text}
                />
              )}
              {section.type === 'title' && (
                <TextField
                  name={`sections[${index}].title`}
                  label="Section Title"
                  InputRef={register}
                  defaultValue={section.title}
                />
              )}
              {section.type === 'link' && (
                <>
                  <Grid item>
                    <TextField
                      label="URL"
                      name={`sections[${index}].link.url`}
                      type="url"
                      InputRef={register}
                      defaultValue={section.link?.url}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name={`sections[${index}].link.name`}
                      label="Button Text"
                      type="text"
                      InputRef={register}
                      defaultValue={section.link?.name}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box height="0.5rem" />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="space-between">
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <Box maxWidth="8rem" textOverflow="ellipsis">
                        <Typography noWrap>Order</Typography>
                      </Box>
                    </Grid>
                    {!last && (
                      <Grid item>
                        <DownButton />
                      </Grid>
                    )}
                    <Grid item>
                      <Typography>{index + 1}</Typography>
                    </Grid>
                    {!first && (
                      <Grid item>
                        <UpButton />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <RemoveButton />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box height="0.5rem" />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}

export default SectionItem
