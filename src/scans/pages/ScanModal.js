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
import PrimaryModal from '../../shared/layouts/PrimaryModal'

import styled from 'styled-components'

import theme from '../../theme'

import ErrorMessage from '../../shared/components/UIElements/ErrorMessage'
import loadingImage from '../../images/Plynth-Loading-GIF.gif'
import foundImage from '../../images/Plynth-Loading-Final.png'

const { REACT_APP_BACKEND_URL } = process.env

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

const ScanModal = ({ isOpen, setIsOpen, ...props }) => {
  const {
    isProcessing,
    uploadError,
    uploadImage,
    clearUploadError,
  } = useImageUpload()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [foundScreen, setFoundScreen] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [scanData, setScanData] = useState({
    found: false,
    piece: null,
    scan: null,
  })

  useEffect(() => {
    if (scanData.found && isOpen) {
      setFoundScreen(true)
      const timer2 = setTimeout(() => {
        setFoundScreen(false)
      }, 500)
      const timer1 = setTimeout(() => {
        setShowCard(true)
      }, 300)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [scanData, isOpen])

  useEffect(() => {
    const startScan = async () => {
      let uploadedImage

      try {
        uploadedImage = await uploadImage(props.file)
        console.log('uploaded image: ' + uploadedImage)
      } catch (err) {
        setErrorMessage(err.message)
      }

      try {
        if (uploadedImage) {
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
        }
      } catch (err) {
        console.log(err)
        setErrorMessage('Unable to connect to server. Please try again.')
      }

      try {
        let scanResponse = await sendRequest(
          `${REACT_APP_BACKEND_URL}/scans`,
          'POST',
          JSON.stringify(uploadedImage.imageData),
          {
            'Content-Type': 'application/json',
          }
        )

        if (scanResponse) {
          setScanData(scanResponse)
          console.log(scanResponse)
        }
      } catch (err) {
        console.log(err)
        setErrorMessage(err.message)
      }
    }

    if (!!props.file) {
      startScan()
    }
  }, [props.file, uploadImage, sendRequest])

  const handleClose = () => {
    setIsOpen(false)
    setShowCard(false)
    setScanData({
      found: false,
      piece: null,
      scan: null,
    })
    clearError()
    clearUploadError()
    setErrorMessage()
  }

  const handleMissingPiece = () => {
    console.log('scan id: ' + scanData.scan.id)
    try {
      sendRequest(
        `${REACT_APP_BACKEND_URL}/scans/${scanData.scanId}`,
        'PATCH',
        JSON.stringify({
          correct: false,
        }),
        {
          'Content-Type': 'application/json',
        }
      )
    } catch (err) {}

    handleClose()
  }

  return (
    <React.Fragment>
      <NotificationModal fullscreen open={foundScreen} message="FOUND!" />
      <PrimaryModal open={isOpen} onClose={handleClose}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          {!showCard && (
            <React.Fragment>
              <LoadingImage src={loadingImage} />
              <Typography variant="h5">Searching...</Typography>
              <Button onClick={handleClose}>Cancel</Button>
            </React.Fragment>
          )}

          {/* Displays an error screen if no match was found, with the option for the user to report the error */}

          {showCard && !scanData.piece && (
            <Grid item>
              {errorMessage && (
                <Box textAlign="center">
                  <Typography variant="h6">{errorMessage}</Typography>
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
                      Think this was an mistake? Let us know.
                    </Typography>
                  </Box>
                  <ActionBar
                    primaryAction={handleClose}
                    primaryLabel="Close"
                    secondaryAction={handleMissingPiece}
                    secondaryLabel="Report Error"
                  />
                </React.Fragment>
              )}
            </Grid>
          )}

          {showCard && scanData.piece && (
            <PieceCard
              piece={scanData.piece}
              onClose={handleClose}
              loggedOut={props.loggedOut}
            />
          )}
        </Grid>
      </PrimaryModal>
    </React.Fragment>
  )
}

export default ScanModal
