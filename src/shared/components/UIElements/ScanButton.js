import React, { useState, useEffect, useRef } from 'react'

import {
  Fab,
  AppBar,
  Dialog,
  Container,
  Grid,
  Box,
  Button,
  Slide,
  Hidden,
  Typography,
  Fade,
  Grow,
} from '@material-ui/core'

import { useHttpClient } from '../../hooks/http-hook'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import PieceCard from '../../../pieces/components/PieceCard'
import ActionBar from '../Navigation/ActionBar'
import NotificationModal from './NotificationModal'

import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import theme from '../../../theme'

import loadingImage from '../../../images/Plynth-Loading-GIF.gif'
import foundImage from '../../../images/Plynth-Loading-Final.png'

const { REACT_APP_BACKEND_URL } = process.env

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const isInStandaloneMode = () => {
  return 'standalone' in window.navigator && window.navigator.standalone
}

const useStyles = makeStyles(theme => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    bottom: isInStandaloneMode() ? theme.spacing(4) : theme.spacing(0),
    zIndex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    alignContent: 'center',
  },
}))

const LoadingImage = styled.img`
  height: 50px;
  width: 50px;
  margin: 2rem;
`

const ScanModal = () => {
  const [open, setOpen] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [foundScreen, setFoundScreen] = useState(false)
  const [file, setFile] = useState(null)
  const [pieceId, setPieceId] = useState()
  const [isValid, setIsValid] = useState()

  const handleClose = () => {
    setOpen(false)
    setPieceId()
    setFile(null)
    setIsValid(false)
  }

  const classes = useStyles()

  const filePickerRef = useRef()

  useEffect(() => {
    if (!isLoading && !!pieceId) {
      setFoundScreen(true)
      const timer = setTimeout(() => {
        setFoundScreen(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading, pieceId])

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

        if (res) setPieceId(res.pieceId)
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
      <input
        id="image"
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accepts=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <NotificationModal fullscreen open={foundScreen} message="FOUND!" />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Container maxwidth="xs">
          {isLoading && (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}
            >
              <Grid item xs={3} align="center">
                <LoadingImage src={loadingImage} />
                <Typography variant="h5">Searching...</Typography>
                <ActionBar
                  secondaryAction={handleClose}
                  secondaryLabel="Cancel"
                />
              </Grid>
            </Grid>
          )}
          {!isLoading && !pieceId && (
            <React.Fragment>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ minHeight: '80vh' }}
              >
                <Grid item>
                  <Box textAlign="center">
                    <Typography variant="h6" align="center">
                      Sorry! We couldn't find a match. Scan again or add a new
                      piece.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box height="4rem"></Box>
              <ActionBar primaryAction={handleClose} primaryLabel="Close" />
            </React.Fragment>
          )}
          {!isLoading && pieceId && (
            <React.Fragment>
              <PieceCard pieceId={pieceId} onClose={handleClose} />
              <Box height="4rem"></Box>
              <ActionBar
                primaryAction={handleClose}
                primaryLabel="Add to Collection +"
              />
            </React.Fragment>
          )}
        </Container>
      </Dialog>
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
