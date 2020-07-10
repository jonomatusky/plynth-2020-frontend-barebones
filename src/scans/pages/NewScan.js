import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Grid } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

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
    <Container maxWidth="xs">
      <PageTitle title={title} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Grid container direction="column" spacing={2}>
        <ImageUpload center id="image" onInput={inputHandler} />
      </Grid>
    </Container>
  )
}

export default NewImage
