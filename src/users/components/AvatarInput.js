import React, { useState, useEffect, useRef } from 'react'
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

import ErrorBar from '../../shared/components/notifications/ErrorBar'
import ActionButton from '../../shared/components/ui/ActionButton'
import ImageCropper from '../../shared/components/imageHandling/ImageCropper'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}))

const PieceImageCrop = props => {
  const classes = useStyles()
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [uploadError, setUploadError] = useState()
  const [imageSrc, setImageSrc] = useState(null)
  const [imageUrl, setImageUrl] = useState(props.imageUrl)
  const [isLoading, setIsLoading] = useState(false)

  const [file, setFile] = useState(null)

  const filePickerRef = useRef()

  const openDialog = () => {
    setDialogIsOpen(true)
  }

  const closeDialog = () => {
    setDialogIsOpen(false)
    setFile(null)
  }

  const filePickerHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  const pickHandler = async event => {
    setIsLoading(true)
    let pickedFile
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]
      setFile(pickedFile)
    } else {
      setUploadError(
        'There was an error uploading your file. Please try again.'
      )
    }
    filePickerRef.current.value = ''
  }

  useEffect(() => {
    if (!file) {
      setImageSrc(null)
    } else {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setImageSrc(fileReader.result)
      }
      fileReader.readAsDataURL(file)
    }
    setIsLoading(false)
  }, [file])

  const submitHandler = async ({ imageUrl, imageFilepath }) => {
    setImageUrl(imageUrl)
    props.onInput(imageFilepath)
  }

  useEffect(() => {
    if (imageUrl) {
      closeDialog()
    }
  }, [imageUrl])

  return (
    <>
      <ErrorBar
        open={!!uploadError}
        error={uploadError}
        handleClose={() => {
          setUploadError(null)
        }}
      />
      <input
        id="image"
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <Dialog
        fullScreen
        open={!!(dialogIsOpen && imageSrc)}
        onClose={closeDialog}
      >
        <ImageCropper
          round
          imageSrc={imageSrc}
          file={file}
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
            fullWidth={false}
            variant="text"
            onClick={closeDialog}
            label="Close"
          />
          <ActionButton
            fullWidth={false}
            onClick={filePickerHandler}
            label="Upload"
            loading={isLoading}
          />
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
