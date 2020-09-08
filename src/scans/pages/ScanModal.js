import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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

const MessageScreen = styled(Box)`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

const CenteredGrid = styled(Grid)`
  height: 100%;
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
  const [submittedMissingPiece, setSubmittedMissingPiece] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (scanData.found && isOpen) {
      setFoundScreen(true)
      const timer2 = setTimeout(() => {
        setFoundScreen(false)
      }, 500)
      const timer1 = setTimeout(() => {
        setShowCard(true)
        if (scanData.piece.isDirect) {
          history.push(`/${scanData.piece.owner.username}`)
        }
      }, 300)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [scanData, history, isOpen])

  useEffect(() => {
    const startScan = async () => {
      let uploadedImage

      try {
        uploadedImage = await uploadImage(props.file)
      } catch (err) {
        setErrorMessage(err.message)
        return
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
        return
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
        }
      } catch (err) {
        console.log(err)
        setErrorMessage(err.message)
        return
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
    setSubmittedMissingPiece(false)
    clearError()
    clearUploadError()
    setErrorMessage()
  }

  const handleMissingPiece = () => {
    console.log(scanData)
    try {
      sendRequest(
        `${REACT_APP_BACKEND_URL}/scans/${scanData.scan.id}`,
        'PATCH',
        JSON.stringify({
          correct: false,
        }),
        {
          'Content-Type': 'application/json',
        }
      )
    } catch (err) {}

    setSubmittedMissingPiece(true)
  }

  const Content = () => {
    if (errorMessage) {
      return (
        <MessageScreen>
          <CenteredGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {errorMessage && (
              <Box textAlign="center">
                <Typography variant="h6">{errorMessage}</Typography>
                <Button onClick={handleClose}>Close</Button>
              </Box>
            )}
          </CenteredGrid>
        </MessageScreen>
      )
    } else if (isLoading || isProcessing) {
      return (
        <MessageScreen>
          <CenteredGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <LoadingImage src={loadingImage} />
            </Grid>
            <Grid item>
              <Typography variant="h5">Searching...</Typography>
            </Grid>
            <Grid item>
              <Button onClick={handleClose}>Cancel</Button>
            </Grid>
          </CenteredGrid>
        </MessageScreen>
      )
    } else if (showCard) {
      return (
        <Grid container direction="column" justify="center" alignItems="center">
          <Box minHeight="2vh"></Box>
          <PieceCard
            piece={scanData.piece}
            onClose={handleClose}
            loggedOut={props.loggedOut}
          />
          <Box minHeight="2vh"></Box>
        </Grid>
      )
    } else if (scanData.scan && !scanData.piece) {
      return (
        <MessageScreen>
          <CenteredGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              {submittedMissingPiece ? (
                <Typography variant="h6" align="center">
                  Thanks for letting us know!
                </Typography>
              ) : (
                <Typography variant="h6" align="center">
                  Sorry, we couldn't find a matching piece.
                </Typography>
              )}
            </Grid>
            <Grid item>
              {!submittedMissingPiece && (
                <Typography align="center">
                  Think this was a mistake? Let us know.
                </Typography>
              )}
            </Grid>

            <ActionBar
              primaryAction={handleClose}
              primaryLabel="Close"
              secondaryAction={!submittedMissingPiece && handleMissingPiece}
              secondaryLabel={!submittedMissingPiece && 'Report Error'}
            />
          </CenteredGrid>
        </MessageScreen>
      )
    } else {
      return <div></div>
    }
  }

  return (
    <React.Fragment>
      <NotificationModal fullscreen open={foundScreen} message="FOUND!" />
      <PrimaryModal open={isOpen} onClose={handleClose}>
        <Content />
      </PrimaryModal>
    </React.Fragment>
  )
}

export default ScanModal
