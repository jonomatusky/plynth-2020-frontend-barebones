import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Container, Grid, Box, Typography, Button } from '@material-ui/core'

import { setScan, clearScan } from '../../redux/scanSlice'
import { useApiClient } from '../../shared/hooks/api-hook'
import { useImageUpload } from '../../shared/hooks/image-hook'

import Background from '../../shared/layouts/Background'
import PieceCard from '../../pieces/components/PieceCard'
import ActionBar from '../../shared/components/navigation/ActionBar'
import FoundModal from '../../shared/components/notifications/FoundModal'

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
  const { imageUrl, scan, piece, found, scanToken } = useSelector(
    state => state.scan
  )
  const {
    isProcessing,
    uploadError,
    uploadImage,
    clearUploadError,
  } = useImageUpload()
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const [foundScreen, setFoundScreen] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [submittedMissingPiece, setSubmittedMissingPiece] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (found) {
      setFoundScreen(true)
      const timer2 = setTimeout(() => {
        setFoundScreen(false)
      }, 500)
      const timer1 = setTimeout(() => {
        setShowCard(true)
        if (piece.isDirect) {
          history.push(`/${piece.owner.username}`)
        }
      }, 300)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [piece, found, history])

  useEffect(() => {
    const startScan = async () => {
      let response

      try {
        response = await uploadImage(imageUrl)
        let { signedUrl, imageFilepath, image } = response
        await sendRequest(signedUrl, 'PUT', image)
        let { scan, scanToken } = await sendRequest(`/scans`, 'POST', {
          imageFilepath: imageFilepath,
        })
        dispatch(setScan({ scan, scanToken }))
      } catch (err) {}
    }

    if (!!imageUrl) {
      startScan()
    } else {
      history.goBack()
    }
  }, [imageUrl, uploadImage, sendRequest, dispatch, history])

  const handleClose = () => {
    setShowCard(false)
    dispatch(clearScan())
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
        <>
          <Background />
          <Container maxWidth="xs" disableGutters>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Box minHeight="2vh"></Box>
              <PieceCard
                piece={piece}
                onClose={handleClose}
                loggedOut={props.loggedOut}
              />
              <Box minHeight="2vh"></Box>
            </Grid>
          </Container>
        </>
      )
    } else if (scan && !piece) {
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
      <Content />
    </React.Fragment>
  )
}

export default ScanModal
