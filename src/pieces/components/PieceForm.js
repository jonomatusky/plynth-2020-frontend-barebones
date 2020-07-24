import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, Box, Typography, Button } from '@material-ui/core'

import styled from 'styled-components'
import theme from '../../theme'

import ActionButton from '../../shared/components/UIElements/ActionButton'

const Label = styled.label`
  color: ${theme.palette.secondary.main};
`

const Input = styled.input`
  width: 100%;
  font: inherit;
  color: inherit;
  border: 1px solid ${theme.palette.secondary.main};
  background: #1b1d1b;
  padding: 0.2rem 0.75rem 0.4rem 0.75rem;
  margin: 0rem 0rem 1rem 0rem;
`

const TitleInput = styled(Input)`
  font-weight: bold;
  font-size: 1.5rem;
`

const TextArea = styled.textarea`
  width: 100%;
  font: inherit;
  color: inherit;
  border: 1px solid ${theme.palette.secondary.main};
  background: #1b1d1b;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  margin: 0rem 0rem 1rem 0rem;
`

const BarRow = styled(Grid)`
  background: ${theme.palette.secondary.main};
  padding-left: 10px;
  padding-right: 10px;
  color: ${theme.palette.background.paper};
  align-content: center;
`

const BarTitle = styled(Grid)`
  font-weight: bold;
`

const FieldSet = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
`

const PieceForm = props => {
  const [indexes, setIndexes] = React.useState([])
  const [counter, setCounter] = React.useState(0)

  const { handleSubmit, control, reset, errors, register } = useForm()

  const addLink = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter])
    setCounter(prevCounter => prevCounter + 1)
  }

  const removeLink = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)])
    setCounter(prevCounter => prevCounter - 1)
  }

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Label>
            <Box marginBottom={1}>Title</Box>
            {/* <Controller as={Input} name="Title" control={control} defaultValue="" /> */}
            <TitleInput
              name="title"
              label="Title"
              ref={register({ required: true })}
              fontWeight="bold"
            />
          </Label>
        </Grid>
        <Grid item>
          <Label>
            <Box marginBottom={1}>Description</Box>
            <TextArea name="description" label="Title" ref={register} />
          </Label>
        </Grid>

        {indexes.map(index => {
          const fieldName = `links[${index}]`
          return (
            <Grid item>
              <FieldSet container direction="column">
                <BarRow container justify="space-between" alignItems="center">
                  <BarTitle>
                    <Typography color="inherit">Link {index + 1}</Typography>
                  </BarTitle>
                  <Grid>
                    <Button color="inherit" onClick={removeLink(index)}>
                      Remove X
                    </Button>
                  </Grid>
                </BarRow>
                <Grid item>
                  <Box margin="1rem">
                    <Label margin="2rem">
                      URL:
                      <Input
                        type="text"
                        name={`${fieldName}.url`}
                        ref={register({ required: true })}
                      />
                    </Label>
                  </Box>
                </Grid>
                <Grid item>
                  <Box margin="1rem">
                    <Label>
                      Link Text:
                      <Input
                        type="text"
                        name={`${fieldName}.name`}
                        ref={register({ required: true })}
                      />
                    </Label>
                  </Box>
                </Grid>
              </FieldSet>
            </Grid>
          )
        })}
        <Grid item>
          <ActionButton
            type="button"
            onClick={addLink}
            label="Add Link"
            color="secondary"
          />
        </Grid>
        <Grid item>
          <ActionButton type="submit" label="Save" />
        </Grid>
      </Grid>
    </form>
  )
}

export default PieceForm
