import React, { useState, useEffect, useRef } from 'react'

import { Box, Grid } from '@material-ui/core'

import { useHttpClient } from '../../hooks/http-hook'

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
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState()

  const filePickerRef = useRef()

  // updates the preview image when the file is updated

  // const renderImage = (src, maxDimension) => {
  //   let image = document.createElement('img')
  //   image.onload = () => {
  //     let canvas = document.createElement('canvas')

  //     let width = image.width
  //     let height = image.height
  //     let shortEdgeLength = Math.min(width, height)

  //     if (shortEdgeLength > maxDimension) {
  //       let scale = maxDimension / shortEdgeLength
  //       width = Math.round(width * scale)
  //       height = Math.round(height * scale)
  //     }

  //     canvas.width = width
  //     canvas.height = height
  //   }
  //   image.src = src
  // }

  const loadImgAsync = imgSrc => {
    console.log('loading image')
    return new Promise((resolve, reject) => {
      console.log('loading image')
      let img = document.createElement('img')
      img.onload = () => {
        resolve(img)
      }
      img.onerror = () => {
        console.log('error loading image')
        reject('error loading image')
      }
      img.src = imgSrc
      console.log('done loading')
    })
  }

  const readFileAsync = file => {
    console.log('reading file')
    return new Promise((resolve, reject) => {
      console.log('reading file')
      let reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
      console.log('done reading file')
    })
  }

  const imgToBlobAsync = (img, canvas) => {
    return new Promise((resolve, reject) => {
      console.log('creating blob image')
      const ctxMain = canvas.getContext('2d')
      ctxMain.drawImage(img, 0, 0, canvas.width, canvas.height)
      ctxMain.canvas.toBlob(async blob => {
        resolve(blob)
      }, 'image/*')
    })
  }

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

  const resizeFile = async (file, maxDimension) => {
    console.log('resizing image')
    const imgSrc = await readFileAsync(file)
    console.log('data url: ' + imgSrc)
    const image = await loadImgAsync(imgSrc)
    console.log('height', image.height)

    const canvas = document.createElement('canvas')

    let width = image.width
    let height = image.height
    let shortEdgeLength = Math.min(width, height)

    if (shortEdgeLength > maxDimension) {
      let scale = maxDimension / shortEdgeLength
      width = Math.round(width * scale)
      height = Math.round(height * scale)
    }

    canvas.width = width
    canvas.height = height

    const blob = await imgToBlobAsync(image, canvas)

    return blob
  }

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
        resizedFile = await resizeFile(pickedFile, 600)
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
          accepts=".jpg, .png, .jpeg"
          onChange={pickHandler}
        />
      </Grid>
      <Grid item>
        <ImagePreview>
          {previewUrl && <Image src={previewUrl} alt="Preview" />}
          {isLoading && (
            <Box height="100%" align="center">
              <LoadingSpinner asOverlay />
            </Box>
          )}
          {!previewUrl && !isLoading && (
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
