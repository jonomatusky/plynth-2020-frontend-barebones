import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAwsClient } from '../../shared/hooks/aws-hook'

import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import Button from '../../shared/components/FormElements/Button'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import './NewPiece.css'

const NewPiece = () => {
  const { isLoading, error, sendRequest, clearError } = useAwsClient()
  const [imageValue, setImageValue] = useState(null)
  const [imageIsValid, setImageIsValid] = useState(false)
  const [imageData, setImageData] = useState({
    signedUrl: null,
    awsFileName: null,
  })

  const inputHandler = (id, value, isValid, imageData) => {
    if (isValid) {
      setImageValue(value)
      setImageIsValid(true)
      setImageData(imageData)
      console.log(imageData.signedUrl)
    }
  }

  const history = useHistory()

  const pieceSubmitHandler = async event => {
    event.preventDefault()
    try {
      console.log('submitted')

      console.log(imageData.signedUrl)
      const response = await sendRequest(imageData.signedUrl, 'PUT', imageValue)
      console.log('received')
      console.log(response.status)
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="piece-form" onSubmit={pieceSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay />}
      <ImageUpload center id="image" onInput={inputHandler} />
      <Button type="submit" disabled={!imageIsValid}>
        CREATE PIECE
      </Button>
    </form>
  )
}

export default NewPiece
