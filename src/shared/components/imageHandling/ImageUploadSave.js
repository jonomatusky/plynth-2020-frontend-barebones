import React, { useState, useEffect, useRef } from 'react'

import { Box, Grid } from '@material-ui/core'

import { useHttpClient } from '../../hooks/http-hook'
import { useImageUpload } from '../../hooks/image-hook'
import CircularProgress from '@material-ui/core/CircularProgress'

import ErrorBar from '../notifications/ErrorBar'
import ActionButton from '../ui/ActionButton'

import styled from 'styled-components'

import theme from '../../../theme'

const ImagePreview = styled(Box)`
  height: 90vw;
  max-height: 300px;
  background: #1b1d1b;
  border: 1px solid ${theme.palette.secondary.main};
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageUpload = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const {
    isProcessing,
    uploadError,
    uploadImage,
    clearUploadError,
  } = useImageUpload()
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState()

  const filePickerRef = useRef()

  useEffect(() => {
    if (props.previewUrl) {
      setPreviewUrl(props.previewUrl)
    }
  }, [props.previewUrl])

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  // checks to make sure the file is valid
  // NOTE: need stronger validation here? and need to reduce file size.
  const pickHandler = async event => {
    let response
    let avatar
    // let fileIsValid = isValid

    if (event.target.files && event.target.files.length === 1) {
      const file = event.target.files[0]

      try {
        response = await uploadImage(file)
        avatar = `${response.imageData.id}.${response.imageData.ext}`
        await sendRequest(response.signedUrl, 'PUT', response.image, {}, false)
        setFile(response.image)
        props.onInput(avatar)
        setPreviewUrl(null)

        // setIsValid(true)
        // fileIsValid = true
        // setFile(response.image)
      } catch (err) {
        // setIsValid(false)
        // setImageUploadError('Please select an image file.')
        // fileIsValid = false
        //     return
        //   }
        // } else {
      }
      //   setIsValid(false)
      //   setImageUploadError('Please select an image file.')
      //   fileIsValid = false
      //   return
    }
  }

  const pickImageHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <ErrorBar
        open={!!uploadError}
        error={uploadError}
        handleClose={clearUploadError}
      />
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <Grid item>
        <ImagePreview>
          {(isProcessing || isLoading) && (
            <Box
              height="100%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress size="2rem" color="inherit" thickness={6} />
            </Box>
          )}
          {previewUrl && !isProcessing && !isLoading && (
            <Image src={previewUrl} alt="Preview" />
          )}
          {!previewUrl && !isLoading && !isProcessing && (
            <ActionButton
              variant="text"
              onClick={pickImageHandler}
              label="Upload Image"
              color="secondary"
              height="100%"
              size="large"
              style={{ height: '100%' }}
            />
          )}
        </ImagePreview>
      </Grid>
      <Grid item>
        <ActionButton
          onClick={pickImageHandler}
          label="Change Image"
          disabled={!previewUrl}
        />
      </Grid>
    </React.Fragment>
  )
}

export default ImageUpload
