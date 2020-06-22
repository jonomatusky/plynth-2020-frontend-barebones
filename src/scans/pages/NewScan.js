import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import './NewScan.css'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'New Pickup'

const NewImage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const history = useHistory()

  const inputHandler = async (id, value, isValid, imageData) => {
    if (isValid) {
      try {
        const awsRes = await sendRequest(
          imageData.signedUrl,
          'PUT',
          value,
          {},
          false
        )
        if (awsRes.status !== 200) {
          console.log('Got a 200 error on AWS request')
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
    <Container maxWidth="sm">
      <PageTitle title={title} />
      <div className="image-form">
        {isLoading && <LoadingSpinner asOverlay />}
        <ImageUpload center id="image" onInput={inputHandler} />
      </div>
    </Container>
  )
}

export default NewImage
