import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Cropper from 'react-easy-crop'
import {
  Container,
  Grid,
  AppBar,
  Fab,
  Toolbar,
  Slider,
  Typography,
} from '@material-ui/core'
import styled from 'styled-components'

import { useHttpClient } from '../../shared/hooks/http-hook'
import { useImageUpload } from '../../shared/hooks/image-hook'
import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'
import Background from '../../shared/layouts/Background'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import ActionButton from '../../shared/components/ui/ActionButton'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

import { makeStyles } from '@material-ui/core/styles'

const isInStandaloneMode = () => {
  return 'standalone' in window.navigator && window.navigator.standalone
}

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

const useStyles = makeStyles(theme => ({
  topBar: {
    background: theme.palette.background.default,
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  bottomBar: {
    top: 'auto',
    bottom: 0,
    background: theme.palette.background.default,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: isInStandaloneMode() ? theme.spacing(4) : theme.spacing(1),
    elevation: 0.0,
  },
}))

const PieceImageCrop = () => {
  const classes = useStyles()
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const {
    isProcessing,
    uploadError,
    uploadImage,
    clearUploadError,
  } = useImageUpload()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const [file, setFile] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)

  const filePickerRef = useRef()

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
  }, [file])

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

  const imageSubmitHandler = async event => {
    event.preventDefault()

    try {
      let response = await uploadImage(file, croppedAreaPixels)
      let imageData = response.imageData
      await sendRequest(response.signedUrl, 'PUT', response.image, {}, false)

      sessionStorage.setItem('imageId', imageData.id)
      sessionStorage.setItem('imageExt', imageData.ext)
      history.push('/admin/create/piece')
    } catch (err) {
      console.log(err)
    }
  }

  const setUploadMode = () => {
    setFile(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <ErrorBar
        open={!!uploadError}
        error={uploadError}
        handleClose={clearUploadError}
      />
      {/* <Background /> */}
      <input
        id="image"
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accepts=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <Container maxWidth="sm" disableGutters>
        {!file ? (
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
            </CenteredGrid>
            <ActionButton
              onClick={() => {
                history.push('/admin/pieces')
              }}
              label="Cancel"
              variant="text"
              fullWidth={false}
            />
          </CenterScreen>
        ) : (
          <>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <AppBar className={classes.topBar}>
              <Slider
                color="secondary"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </AppBar>
            <AppBar className={classes.bottomBar}>
              <Toolbar>
                <ActionButton
                  onClick={setUploadMode}
                  label="Cancel"
                  variant="text"
                  fullWidth={false}
                />
                <ActionButton
                  onClick={imageSubmitHandler}
                  loading={isLoading || isProcessing}
                  label={`Crop & Save`}
                />
              </Toolbar>
            </AppBar>
          </>
        )}
      </Container>
    </React.Fragment>
  )
}

export default PieceImageCrop
