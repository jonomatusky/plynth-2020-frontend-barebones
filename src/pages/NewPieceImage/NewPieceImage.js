import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Fab, Typography, Button } from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

import { usePieceStore } from 'hooks/store/use-piece-store'
import ImageCropper from '../../components/ImageCropper'
import CenteredGrid from 'layouts/CenteredGrid'
import ImagePicker from 'components/ImagePicker'

const PieceImageCrop = () => {
  const { setNewPieceImage } = usePieceStore()
  const history = useHistory()
  const [imageSrc, setImageSrc] = useState(null)

  const setUploadMode = () => {
    setImageSrc(null)
  }

  const handleSelect = imageUrl => {
    setImageSrc(imageUrl)
  }

  const handleSubmit = async response => {
    try {
      setNewPieceImage(response.imageFilepath)
      history.push('/admin/create/piece')
    } catch (err) {}
  }

  return (
    <>
      {!imageSrc && (
        <CenteredGrid>
          <Grid item>
            <ImagePicker onSelect={handleSelect}>
              <Fab size="large" color="primary">
                <AddAPhotoIcon />
              </Fab>
            </ImagePicker>
          </Grid>
          <Grid item>
            <Grid container justify="center">
              <Grid item xs={8}>
                <Typography variant="h6">
                  Upload a photo to start creating your new piece.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                history.push('/admin/pieces')
              }}
              variant="text"
            >
              Cancel
            </Button>
          </Grid>
        </CenteredGrid>
      )}
      {imageSrc && (
        <ImageCropper
          imageSrc={imageSrc}
          onCancel={setUploadMode}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}

export default PieceImageCrop
