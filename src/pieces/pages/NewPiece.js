import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Box, Grid, Typography, Button } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import styled from 'styled-components'
import theme from '../../theme'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const ASSET_URL = process.env.REACT_APP_ASSET_URL

const title = 'Create New Piece'

const ImageBox = styled(Box)`
  width: 10rem;
  height: 10rem;
  margin-bottom: 1rem;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

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

const NewPiece = () => {
  const [indexes, setIndexes] = React.useState([])
  const [counter, setCounter] = React.useState(0)
  const [imageData, setImageData] = useState({
    id: null,
    ext: null,
  })
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const history = useHistory()

  const addLink = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter])
    setCounter(prevCounter => prevCounter + 1)
  }

  const removeLink = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)])
    setCounter(prevCounter => prevCounter - 1)
  }

  if (
    !sessionStorage.getItem('imageId') ||
    !sessionStorage.getItem('imageExt')
  ) {
    console.log('no image in session storage')
    history.push('/')
  }

  const { register, handleSubmit, watch, errors } = useForm()

  useEffect(() => {
    setImageData({
      id: sessionStorage.getItem('imageId'),
      ext: sessionStorage.getItem('imageExt'),
    })
  }, [])

  const onSubmit = async formData => {
    try {
      const pieceData = { imageData, pieceData: formData }
      const res = await sendRequest(
        BACKEND_URL + '/pieces/',
        'POST',
        JSON.stringify(pieceData),
        {
          'Content-Type': 'application/json',
        }
      )
      history.push(`/pieces/${res.pieceId}`)
    } catch (err) {}
  }

  return (
    <Container maxWidth="xs">
      <PageTitle title={title} />
      <Grid container direction="column">
        <Grid container justify="center">
          <ImageBox>
            <Image
              src={`${ASSET_URL}/${imageData.id}.${imageData.ext}`}
              alt="Preview"
            />
          </ImageBox>
        </Grid>
        <Grid container direction="column">
          <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Label>
                  <Box marginBottom={1}>Title</Box>
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
                      <BarRow
                        container
                        justify="space-between"
                        alignItems="center"
                      >
                        <BarTitle>
                          <Typography color="inherit">
                            Link {index + 1}
                          </Typography>
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
                              ref={register}
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
                              ref={register}
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
        </Grid>
      </Grid>
      <Box height="10rem"></Box>
    </Container>
  )
}

export default NewPiece
