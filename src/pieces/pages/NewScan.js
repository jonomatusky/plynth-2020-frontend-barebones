import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'

import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import './NewImage.css'

const { REACT_APP_BACKEND_URL } = process.env

const NewImage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const history = useHistory()

  const inputHandler = async (id, value, isValid, imageData) => {
    if (isValid) {
      console.log('submitted')

      try {
        const awsRes = await sendRequest(
          imageData.signedUrl,
          'PUT',
          value,
          {},
          false
        )
        if (awsRes.status !== 200) {
          throw error
        }

        const res = await sendRequest(
          `${REACT_APP_BACKEND_URL}/scans`,
          'POST',
          JSON.stringify(imageData),
          {
            'Content-Type': 'application/json',
          }
        )
        history.push(`/pieces/${res.pieceId}`)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="image-form">
      {isLoading && <LoadingSpinner asOverlay />}
      <ImageUpload center id="image" onInput={inputHandler} />
    </div>
  )
}

export default NewImage
