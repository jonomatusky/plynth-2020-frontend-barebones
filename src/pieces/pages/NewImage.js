import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Grid } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import ErrorBar from '../../shared/components/UIElements/ErrorBar'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const title = 'Create New Piece'

const NewImage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [image, setImage] = useState(null)
  const [imageIsValid, setImageIsValid] = useState(false)
  const [imageData, setImageData] = useState({
    url: null,
    awsFileName: null,
  })
  const [signedUrl, setSignedUrl] = useState()

  const inputHandler = (signedUrl, imageData, image, isValid) => {
    if (isValid) {
      setSignedUrl(signedUrl)
      setImageData(imageData)
      setImage(image)
      setImageIsValid(true)
    }
  }

  const history = useHistory()

  const imageSubmitHandler = async event => {
    event.preventDefault()
    try {
      const awsRes = await sendRequest(signedUrl, 'PUT', image, {}, false)
      if (awsRes.status === 200) {
        sessionStorage.setItem('imageId', imageData.id)
        sessionStorage.setItem('imageExt', imageData.ext)
        history.push('/admin/create/piece')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Container maxWidth="xs">
        <PageTitle title={title} />
        <form onSubmit={imageSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Grid container direction="column" spacing={2}>
            <ImageUpload center id="image" onInput={inputHandler} />
            <Grid item>
              <ActionButton
                type="submit"
                disabled={!imageIsValid}
                label="Create Piece"
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  )
}

export default NewImage
