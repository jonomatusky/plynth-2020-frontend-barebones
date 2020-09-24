import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { AppBar, Toolbar, Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import { useHttpClient } from '../../hooks/http-hook'
import { useImageUpload } from '../../hooks/image-hook'
import ErrorBar from '../notifications/ErrorBar'
import LoadingSpinner from '../ui/LoadingSpinner'
import ActionButton from '../ui/ActionButton'

import './react-easy-crop.css'

// import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'

const isInStandaloneMode = () => {
  return 'standalone' in window.navigator && window.navigator.standalone
}

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

const CropperDiv = styled.div`
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // max-height: 50vh;
  // bottom: 80px;
`

const ImageCropper = props => {
  const classes = useStyles()
  const {
    isProcessing,
    uploadError,
    uploadImage,
    clearUploadError,
  } = useImageUpload()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const submitHandler = async event => {
    try {
      let response = await uploadImage(props.file, croppedAreaPixels)
      const { signedUrl, imageUrl, imageFilepath, image } = response
      await sendRequest(signedUrl, 'PUT', image, {}, false)

      props.onSubmit({ imageUrl, imageFilepath })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <ErrorBar
        open={!!uploadError}
        error={uploadError}
        handleClose={clearUploadError}
      />
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
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
            onClick={props.onCancel}
            label="Cancel"
            variant="text"
            fullWidth={false}
          />
          <ActionButton
            onClick={submitHandler}
            loading={isProcessing || isLoading}
            label={`Accept`}
            fullWidth={false}
          />
        </Toolbar>
      </AppBar>
      {!props.imageSrc ? (
        <LoadingSpinner asOverlay />
      ) : (
        <CropperDiv>
          <Cropper
            image={props.imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape={props.round ? 'round' : 'rect'}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            disableAutomaticStylesInjection={true}
          />
        </CropperDiv>
      )}
    </>
  )
}

export default ImageCropper
