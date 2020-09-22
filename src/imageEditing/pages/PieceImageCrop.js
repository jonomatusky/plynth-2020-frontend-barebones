import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Fab, Typography } from '@material-ui/core'
import styled from 'styled-components'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import ImageCropper from '../components/ImageCropper'
import ActionButton from '../../shared/components/ui/ActionButton'
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
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const setUploadMode = () => {
    setFile(null)
  }
  const [file, setFile] = useState(null)

  const filePickerRef = useRef()

  const filePickerHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  const pickHandler = async event => {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0])
    }
    filePickerRef.current.value = ''
  }

  const submitHandler = async response => {
    try {
      let imageData = response.imageData

      await sendRequest(response.signedUrl, 'PUT', response.image, {}, false)

      sessionStorage.setItem('imageId', imageData.id)
      sessionStorage.setItem('imageExt', imageData.ext)
      history.push('/admin/create/piece')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <input
        id="image"
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accepts=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <Container maxWidth="sm" disableGutters>
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && !file && (
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
                <ActionButton
                  onClick={() => {
                    history.push('/admin/pieces')
                  }}
                  label="Cancel"
                  variant="text"
                  fullWidth={false}
                />
              </Grid>
            </CenteredGrid>
          </CenterScreen>
        )}
        {!isLoading && file && (
          <>
            <ImageCropper
              file={file}
              onCancel={setUploadMode}
              onSubmit={submitHandler}
            />
          </>
        )}
      </Container>
    </>
  )
}

export default PieceImageCrop
