import React, { useState, useEffect } from 'react'

import {
  Dialog,
  Container,
  Grid,
  Box,
  Slide,
  Typography,
  Button,
} from '@material-ui/core'

import { useHttpClient } from '../../shared/hooks/http-hook'
import { useImageUpload } from '../../shared/hooks/image-hook'

import CameraAltIcon from '@material-ui/icons/CameraAlt'
import PieceCard from '../../pieces/components/PieceCard'
import ActionBar from '../../shared/components/Navigation/ActionBar'
import NotificationModal from '../../shared/components/UIElements/NotificationModal'

import styled from 'styled-components'

import theme from '../../theme'

import ErrorMessage from '../../shared/components/UIElements/ErrorMessage'
import loadingImage from '../../images/Plynth-Loading-GIF.gif'
import foundImage from '../../images/Plynth-Loading-Final.png'

const { REACT_APP_BACKEND_URL } = process.env

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const LoadingImage = styled.img`
  height: 50px;
  width: 50px;
`

const StyledContainer = styled(Container)`
  background-image: linear-gradient(
    200deg,
    ${theme.palette.primary.main}22,
    ${theme.palette.primary.main}00
  );
  min-
  height: 100vh;
`

const ScanModal = props => {
  const {
    isProcessing,
    uploadError,
    uploadImage,
    clearUploadError,
  } = useImageUpload()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [open, setOpen] = useState(false)
  const [foundScreen, setFoundScreen] = useState(false)
  const [scanData, setScanData] = useState({
    found: false,
    pieceId: null,
    scanId: null,
  })

  useEffect(() => {
    if (scanData.found) {
      setFoundScreen(true)
      const timer = setTimeout(() => {
        setFoundScreen(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [scanData])

  useEffect(() => {
    const startScan = async () => {
      setOpen(true)

      try {
        const uploadedImage = await uploadImage(props.file)
        console.log('uploaded image: ' + uploadedImage)
        let awsRes = await sendRequest(
          uploadedImage.signedUrl,
          'PUT',
          uploadedImage.image,
          {},
          false
        )
        if (awsRes.status !== 200) {
          console.log('Got a 200 error on AWS request')
        }

        let res = await sendRequest(
          `${REACT_APP_BACKEND_URL}/scans`,
          'POST',
          JSON.stringify(uploadedImage.imageData),
          {
            'Content-Type': 'application/json',
          }
        )
        if (res) {
          setScanData(res)
          console.log(res)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (!!props.file) {
      startScan()
    }
  }, [props.file, uploadImage, sendRequest])

  const handleClose = () => {
    setOpen(false)
    props.setActive(false)
    setScanData({
      found: false,
      pieceId: null,
      scanId: null,
    })
    clearError()
  }

  const handleMissingPiece = correct => {
    console.log('scan id: ' + scanData.scanId)
    try {
      sendRequest(
        `${REACT_APP_BACKEND_URL}/scans/${scanData.scanId}`,
        'PATCH',
        {
          correct,
        }
      )
    } catch (err) {}

    clearUploadError()
    handleClose()
  }

  return (
    <React.Fragment>
      <NotificationModal fullscreen open={foundScreen} message="FOUND!" />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <StyledContainer maxwidth="xs">
          {(isProcessing || isLoading) && (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}
            >
              <LoadingImage src={loadingImage} />
              <Typography variant="h5">Searching...</Typography>
              <ActionBar
                secondaryAction={handleClose}
                secondaryLabel="Cancel"
              />
            </Grid>
          )}
          {/* Displays an error screen if no match was found, with the option for the user to report the error */}
          {!isProcessing && !isLoading && !scanData.found && (
            <React.Fragment>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
              >
                <Grid item>
                  {(!!uploadError || !!error) && (
                    <Box textAlign="center">
                      <Typography variant="h5">{uploadError}</Typography>
                      <Typography variant="h6">{error}</Typography>
                      <Button onClick={handleClose}>Close</Button>
                    </Box>
                  )}
                  {!uploadError && !error && (
                    <React.Fragment>
                      <Box textAlign="center">
                        <Typography variant="h6" align="center">
                          Sorry, we couldn't find a matching piece.
                        </Typography>
                        <Typography align="center">
                          Think this was an error? Let us know.
                        </Typography>
                      </Box>
                      <ActionBar
                        primaryAction={handleMissingPiece}
                        primaryLabel="Close"
                        secondaryAction={handleMissingPiece}
                        secondaryLabel="Report Missing Piece"
                      />
                    </React.Fragment>
                  )}
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          {scanData.found && scanData.pieceId && (
            <PieceCard pieceId={scanData.pieceId} onClose={handleClose} />
          )}
        </StyledContainer>
      </Dialog>
    </React.Fragment>
  )
}

export default ScanModal
