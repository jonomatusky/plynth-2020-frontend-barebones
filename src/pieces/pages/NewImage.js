import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAwsClient } from '../../shared/hooks/aws-hook'

import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import Button from '../../shared/components/FormElements/Button'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import './NewImage.css'

const NewImage = () => {
  const { isLoading, error, sendRequest, clearError } = useAwsClient()
  const [imageValue, setImageValue] = useState(null)
  const [imageIsValid, setImageIsValid] = useState(false)
  const [imageData, setImageData] = useState({
    signedUrl: null,
    url: null,
    awsFileName: null,
  })

  const inputHandler = (id, value, isValid, imageData) => {
    if (isValid) {
      setImageValue(value)
      setImageIsValid(true)
      setImageData(imageData)
    }
  }

  const history = useHistory()

  const imageSubmitHandler = async event => {
    event.preventDefault()
    try {
      console.log('submitted')
      const awsRes = await sendRequest(imageData.signedUrl, 'PUT', imageValue)
      if (awsRes.status === 200) {
        sessionStorage.setItem('imageId', imageData.id)
        sessionStorage.setItem('imageExt', imageData.ext)
        history.push('/create/piece')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="image-form" onSubmit={imageSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay />}
      <ImageUpload center id="image" onInput={inputHandler} />
      <Button type="submit" disabled={!imageIsValid}>
        CREATE PIECE
      </Button>
    </form>
  )
}

export default NewImage
