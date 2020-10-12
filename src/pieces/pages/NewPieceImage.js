import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, Grid, Fab, Typography, Button } from '@material-ui/core'
import styled from 'styled-components'

import { setNewPieceImage } from '../../redux/piecesSlice'
import ImageCropper from '../../shared/components/imageHandling/ImageCropper'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

const CenterScreen = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

const CenteredGrid = styled(Grid)`
  height: 100%;
`

const PieceImageCrop = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [imageSrc, setImageSrc] = useState(null)

  const setUploadMode = () => {
    setImageSrc(null)
  }

  const filePickerRef = useRef()

  const filePickerHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  const pickHandler = async event => {
    const { files } = event.target
    if (files.length === 1) {
      const imageUrl = window.URL.createObjectURL(files[0])
      setImageSrc(imageUrl)
    }
    filePickerRef.current.value = ''
  }

  const submitHandler = async response => {
    try {
      dispatch(setNewPieceImage(response.imageFilepath))
      history.push('/admin/create/piece')
    } catch (err) {}
  }

  return (
    <>
      <input
        id="image"
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      {!imageSrc && (
        <Container maxWidth="sm" disableGutters>
          <CenterScreen>
            <CenteredGrid
              container
              direction="column"
              align="center"
              justify="center"
              wrap="nowrap"
              spacing={1}
            >
              <Grid item>
                <Fab size="large" onClick={filePickerHandler} color="primary">
                  <AddAPhotoIcon />
                </Fab>
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Grid item xs={8}>
                    <Typography variant="h6">
                      Upload a photo to start creating your new piece.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    history.push('/admin/pieces')
                  }}
                  variant="text"
                >
                  Cancel
                </Button>
              </Grid>
            </CenteredGrid>
          </CenterScreen>
        </Container>
      )}
      {imageSrc && (
        <>
          <ImageCropper
            imageSrc={imageSrc}
            onCancel={setUploadMode}
            onSubmit={submitHandler}
          />
        </>
      )}
    </>
  )
}

export default PieceImageCrop
