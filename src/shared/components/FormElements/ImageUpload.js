import React, { useState, useEffect, useRef } from 'react'

import { Box, Grid } from '@material-ui/core'

import { useHttpClient } from '../../hooks/http-hook'
import { useImageResizer } from '../../hooks/image-hook'

import ActionButton from '../UIElements/ActionButton'
import LoadingSpinner from '../UIElements/LoadingSpinner'

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
    isRendering,
    imageError,
    resizeImage,
    clearImageError,
  } = useImageResizer()
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState()

  const filePickerRef = useRef()

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
    let pickedFile
    let resizedFile
    let fileIsValid = isValid
    let imageData = {}

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]

      try {
        resizedFile = await resizeImage(pickedFile, 600)
        setFile(resizedFile)
        setIsValid(true)
        imageData = await getSignedRequest(pickedFile)
        fileIsValid = true
      } catch (err) {}
    } else {
    }

    props.onInput(props.id, resizedFile, fileIsValid, imageData)
  }

  const pickImageHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  // gets a signature as soon as the piece is selected
  const getSignedRequest = async file => {
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/sign-s3',
        'POST',
        JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
        {
          'Content-Type': 'application/json',
        }
      )
      return response
    } catch (err) {
      new Error('Could not get signature')
    }
  }

  return (
    <React.Fragment>
      <Grid item>
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: 'none' }}
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={pickHandler}
        />
      </Grid>
      <Grid item>
        <ImagePreview>
          {previewUrl && <Image src={previewUrl} alt="Preview" />}
          {(isRendering || isLoading) && (
            <Box height="100%" align="center">
              <LoadingSpinner />
            </Box>
          )}
          {!previewUrl && !isLoading && !isRendering && (
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
