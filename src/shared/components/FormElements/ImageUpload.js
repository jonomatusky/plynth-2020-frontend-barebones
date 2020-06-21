import React, { useState, useEffect, useRef } from 'react'

import { useHttpClient } from '../../hooks/http-hook'

import Button from './Button'
import LoadingSpinner from '../UIElements/LoadingSpinner'
import './ImageUpload.css'

const ImageUpload = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [file, setFile] = useState(null)
  const [previewUrl, setPReviewUrl] = useState()
  const [isValid, setIsValid] = useState()

  const filePickerRef = useRef()

  // updates the preview image when the file is updated
  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPReviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  // checks to make sure the file is valid
  // NOTE: need stronger validation here? and need to reduce file size.
  const pickHandler = async event => {
    let pickedFile
    let fileIsValid = isValid
    let imageData = {}

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]
      try {
        imageData = await getSignedRequest(pickedFile)
        setFile(pickedFile)
        setIsValid(true)
        fileIsValid = true
      } catch (err) {}
    } else {
    }

    props.onInput(props.id, pickedFile, fileIsValid, imageData)
  }

  const pickImageHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  // gets a signature as soon as the piece is selected
  const getSignedRequest = async file => {
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/images/sign-s3',
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
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accepts=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && (
            <Button type="button" onClick={pickImageHandler}>
              UPLOAD IMAGE
            </Button>
          )}
        </div>
        {previewUrl && (
          <Button type="button--small" onClick={pickImageHandler}>
            CHANGE IMAGE
          </Button>
        )}
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  )
}

export default ImageUpload
