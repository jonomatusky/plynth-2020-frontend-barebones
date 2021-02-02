import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ActionButton from './ActionButton'
import ImageCropper from './ImageCropper'
import ImagePicker from './ImagePicker'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}))

const PieceImageCrop = props => {
  const classes = useStyles()
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [imageUrl, setImageUrl] = useState(props.imageUrl)

  console.log(imageUrl)

  const openDialog = () => {
    setDialogIsOpen(true)
  }

  const closeDialog = () => {
    setDialogIsOpen(false)
    setImageSrc(null)
  }

  const handleSelect = imageUrl => {
    setImageSrc(imageUrl)
  }

  const submitHandler = async ({ imageUrl, imageFilepath }) => {
    setImageUrl(imageUrl)
    props.onInput(imageFilepath)
    closeDialog()
  }

  useEffect(() => {
    const setImage = () => {
      setImageUrl(props.imageUrl)
    }
    setImage()
  }, [setImageUrl, props.imageUrl])

  return (
    <>
      <Dialog
        fullScreen
        open={!!(dialogIsOpen && imageSrc)}
        onClose={closeDialog}
      >
        <ImageCropper
          round
          imageSrc={imageSrc}
          onCancel={closeDialog}
          onSubmit={submitHandler}
        />
      </Dialog>
      <Dialog open={!!(dialogIsOpen && !imageSrc)} onClose={closeDialog}>
        <DialogTitle>"Change Profile Photo"</DialogTitle>
        <DialogContent
          dividers
        >{`Upload a new image to change your profile picture.`}</DialogContent>
        <DialogActions>
          <ActionButton
            fullWidth={true}
            variant="text"
            onClick={closeDialog}
            label="Close"
          />
          <ImagePicker onSelect={handleSelect}>
            <ActionButton label="Upload" />
          </ImagePicker>
        </DialogActions>
      </Dialog>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Avatar src={imageUrl} alt="Preview" className={classes.large} />
        </Grid>
        <Grid item>
          <Button variant="text" onClick={openDialog}>
            Change
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default PieceImageCrop
