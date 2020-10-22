import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Container, Grid, Box, Typography, Button } from '@material-ui/core'

import {
  setScan,
  setScanStage,
  startScanning,
  clearScan,
} from '../../redux/scanSlice'
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

const CenteredGrid = styled(Grid)`
  height: 100%;
`

const NewPickup = ({ isOpen, setIsOpen, ...props }) => {
  const { imageUrl, foundPiece, scanToken, scanStage } = useSelector(
    state => state.scan
  )
  const { scanRoute } = useSelector(state => state.user)
  const { uploadError, uploadImage, clearUploadError } = useImageUpload()
  const { error, sendRequest, clearError } = useApiClient()
  const [showFoundScreen, setShowFoundScreen] = useState(false)
  const [submittedMissingPiece, setSubmittedMissingPiece] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (uploadError || error) {
      dispatch(setScanStage('ERROR'))
    }
  })

  useEffect(() => {
    console.log(`it's ready`)
    if (scanStage === 'READY') {
      console.log('pushing')
      console.log(scanRoute)
      history.push(scanRoute)
    }
  }, [scanStage, history, scanRoute])

  // start the scan when the page loads, if the piece image is set
  useEffect(() => {
    const startScan = async () => {
      try {
        if (imageUrl) {
          dispatch(startScanning())
          let request = imageUrl
          let { signedUrl, imageFilepath, image } = await uploadImage(request)
          await sendRequest({ url: signedUrl, method: 'PUT', data: image })
          let { scan, scanToken } = await sendRequest({
            url: `/scans`,
            method: 'POST',
            data: {
              imageFilepath: imageFilepath,
            },
          })
          dispatch(setScan({ scan, scanToken }))
        } else {
          dispatch(clearScan())
        }
      } catch (err) {}
    }

    if (scanStage === 'SET') {
      startScan()
    }
  }, [
    imageUrl,
    uploadImage,
    sendRequest,
    dispatch,
    history,
    scanStage,
    scanRoute,
  ])

  // if the scan is in progress ('GOING') and the piece is found, set the found screen and piece card
  useEffect(() => {
    if (foundPiece && scanStage === 'FOUND') {
      setShowFoundScreen(true)
      const timer2 = setTimeout(() => {
        setShowFoundScreen(false)
      }, 500)
      const timer1 = setTimeout(() => {
        setShowFoundScreen(false)
        if ((foundPiece || {}).isDirect) {
          history.push({
            pathname: `/${foundPiece.owner.username}`,
            state: { referrer: scanRoute },
          })
          dispatch(setScanStage('READY'))
        } else {
          dispatch(setScanStage('COMPLETE'))
        }
      }, 300)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [foundPiece, history, dispatch, scanStage, scanRoute])

  // on close, reset all variables
  const handleClose = () => {
    dispatch(clearScan())
    clearError()
    clearUploadError()
  }

  const handleMissingPiece = () => {
    try {
      sendRequest({
        url: `/scans`,
        method: 'PATCH',
        data: {
          correct: false,
          scanToken,
        },
      })
    } catch (err) {}

    setSubmittedMissingPiece(true)
  }

  const Content = () => {
    if (scanStage === 'ERROR') {
      return (
        <Background>
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
        </Background>
      )
    } else if (scanStage === 'GOING') {
      return (
        <Background>
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
        </Background>
      )
    } else if (scanStage === 'COMPLETE') {
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
                piece={foundPiece}
                onClose={handleClose}
                loggedOut={props.loggedOut}
              />
              <Box minHeight="2vh"></Box>
            </Grid>
          </Container>
        </>
      )
    } else if (scanStage === 'NO_MATCH') {
      return (
        <Background>
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
        </Background>
      )
    } else {
      return <Background />
    }
  }

  return (
    <React.Fragment>
      <FoundModal fullscreen open={showFoundScreen} message="FOUND!" />
      <Content />
    </React.Fragment>
  )
}

export default NewPickup
