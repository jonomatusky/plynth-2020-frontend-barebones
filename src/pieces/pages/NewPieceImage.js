import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Fab, Typography, Button } from '@material-ui/core'
import styled from 'styled-components'

import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
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
  const [file, setFile] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const setUploadMode = () => {
    setFile(null)
  }

  const filePickerRef = useRef()

  const filePickerHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  const pickHandler = async event => {
    setIsUploading(true)
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0])
    }
    filePickerRef.current.value = ''
  }

  const submitHandler = async response => {
    try {
      sessionStorage.setItem('imageFilepath', response.imageFilepath)
      history.push('/admin/create/piece')
    } catch (err) {}
  }

  useEffect(() => {
    if (!file) {
      setImageSrc(null)
    } else {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setImageSrc(fileReader.result)
      }
      fileReader.readAsDataURL(file)
    }
    setIsUploading(false)
  }, [file])

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
      {isUploading && <LoadingSpinner asOverlay />}
      {!isUploading && !file && (
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
      {!isUploading && file && (
        <>
          <ImageCropper
            imageSrc={imageSrc}
            file={file}
            onCancel={setUploadMode}
            onSubmit={submitHandler}
          />
        </>
      )}
    </>
  )
}

export default PieceImageCrop
