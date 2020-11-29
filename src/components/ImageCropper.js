import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { AppBar, Toolbar, Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useRequest } from 'hooks/use-request'
import { useImageResize } from 'hooks/image-hook'
import { useAlertStore } from 'hooks/store/use-alert-store'
import LoadingSpinner from './LoadingSpinner'
import ActionButton from './ActionButton'

import './react-easy-crop.css'

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

const ImageCropper = props => {
  const classes = useStyles()
  const resizeImage = useImageResize()
  const { setError } = useAlertStore()
  const { status, request } = useRequest()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const submitHandler = async event => {
    let resizedImage

    try {
      resizedImage = await resizeImage(props.imageSrc, 600, croppedAreaPixels)
    } catch (err) {
      setError({ message: err.message })
    }

    try {
      let { signedUrl, imageFilepath, imageUrl } = await request({
        url: '/auth/sign-s3',
        method: 'POST',
        data: {
          fileName: resizedImage.name,
          fileType: resizedImage.type,
        },
      })

      await request({ url: signedUrl, method: 'PUT', data: resizedImage })

      props.onSubmit({ imageUrl, imageFilepath })
    } catch (err) {}
  }

  return (
    <>
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
            loading={status === 'loading'}
            label={`Accept`}
            fullWidth={false}
          />
        </Toolbar>
      </AppBar>
      {!props.imageSrc ? (
        <LoadingSpinner asOverlay />
      ) : (
        <div>
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
        </div>
      )}
    </>
  )
}

export default ImageCropper
