import React, { useState, useRef } from 'react'

import {
  Fab,
  AppBar,
  Dialog,
  Container,
  Grid,
  Button,
  Slide,
  Hidden,
} from '@material-ui/core'

import { useHttpClient } from '../../hooks/http-hook'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import PieceCard from '../../../pieces/components/PieceCard'
import LoadingSpinner from './LoadingSpinner'

import { makeStyles } from '@material-ui/core/styles'

const { REACT_APP_BACKEND_URL } = process.env

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles(theme => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    bottom: theme.spacing(10),
    zIndex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    alignContent: 'center',
  },
}))

const ScanModal = () => {
  const [open, setOpen] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [file, setFile] = useState(null)
  const [pieceId, setPieceId] = useState()
  const [isValid, setIsValid] = useState()

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()

  const filePickerRef = useRef()

  // opens the file picker as soon as the modal is opened

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
        setOpen(true)
        fileIsValid = true
      } catch (err) {}
    } else {
    }

    inputHandler(pickedFile, fileIsValid, imageData)
  }

  // gets a signature as soon as the piece is selected
  const getSignedRequest = async file => {
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/sign-s3',
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

  const inputHandler = async (value, isValid, imageData) => {
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
        setPieceId(res.pieceId)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const pickImageHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <input
          id="image"
          ref={filePickerRef}
          style={{ display: 'none' }}
          type="file"
          accepts=".jpg, .png, .jpeg"
          onChange={pickHandler}
        />
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          {/* {!file && !isLoading && (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}
            >
              <Grid item xs={3}>
                <Button onClick={handleClose}>Cancel</Button>
              </Grid>
            </Grid>
          )} */}
          {isLoading && (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}
            >
              <Grid item xs={3}>
                <LoadingSpinner />
                <Button onClick={handleClose}>Cancel</Button>
              </Grid>
            </Grid>
          )}
          {!isLoading && pieceId && (
            <React.Fragment>
              <Container maxWidth="sm">
                <PieceCard pieceId={pieceId} />
              </Container>
              <Button onClick={handleClose}>CLOSE</Button>
            </React.Fragment>
          )}
        </Dialog>
      </Container>
      <Hidden mdUp>
        <AppBar className={classes.bottomBar}>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fabButton}
            onClick={pickImageHandler}
          >
            <CameraAltIcon />
          </Fab>
        </AppBar>
      </Hidden>
    </React.Fragment>
  )
}

export default ScanModal
