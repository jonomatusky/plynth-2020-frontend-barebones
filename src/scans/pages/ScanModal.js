import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Grid, Box, Typography, Button } from '@material-ui/core'

import { useApiClient } from '../../shared/hooks/api-hook'
import { useImageUpload } from '../../shared/hooks/image-hook'

import PieceCard from '../../pieces/components/PieceCard'
import ActionBar from '../../shared/components/navigation/ActionBar'
import FoundModal from '../../shared/components/notifications/FoundModal'
import PrimaryModal from '../../shared/layouts/PrimaryModal'

import styled from 'styled-components'

import loadingImage from '../../images/Plynth-Loading-GIF.gif'

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
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const [foundScreen, setFoundScreen] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [scanToken, setScanToken] = useState(null)
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
      let response

      try {
        response = await uploadImage(props.file)
        let { signedUrl, imageFilepath, image } = response
        await sendRequest(signedUrl, 'PUT', image)
        let scanResponse = await sendRequest(`/scans`, 'POST', {
          imageFilepath: imageFilepath,
        })
        setScanData(scanResponse)
        setScanToken(scanResponse.scanToken)
        sessionStorage.setItem('scanToken', scanResponse.scanToken)
      } catch (err) {}
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
  }

  const handleMissingPiece = () => {
    try {
      sendRequest(`/scans`, 'PATCH', {
        correct: false,
        scanToken,
      })
    } catch (err) {}

    setSubmittedMissingPiece(true)
  }

  const Content = () => {
    if (error || uploadError) {
      return (
        <MessageScreen>
          <CenteredGrid
            container
            direction="column"
            alignItems="center"
            align="center"
            justify="center"
          >
            <Grid item>
              <Grid container justify="center">
                <Grid item xs={10}>
                  <Typography variant="h6">{error || uploadError}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button onClick={handleClose}>Close</Button>
            </Grid>
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
      <FoundModal fullscreen open={foundScreen} message="FOUND!" />
      <PrimaryModal open={isOpen} onClose={handleClose}>
        <Content />
      </PrimaryModal>
    </React.Fragment>
  )
}

export default ScanModal
