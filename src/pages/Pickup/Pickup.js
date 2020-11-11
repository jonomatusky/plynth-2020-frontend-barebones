import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Container, Grid, Box, Typography, Button } from '@material-ui/core'

import {
  setScan,
  setScanStage,
  startScanning,
  clearScan,
} from 'redux/scanSlice'
import { useApiClient } from 'hooks/api-hook'
import { useImageResize } from 'hooks/image-hook'

import CenteredGrid from 'layouts/CenteredGrid'
import PieceCard from 'components/PieceCard'
import ActionBar from 'components/ActionBar'
import FoundModal from './components/FoundModal'

import styled from 'styled-components'

import loadingImage from 'images/Plynth-Loading-GIF.gif'

const LoadingImage = styled.img`
  height: 50px;
  width: 50px;
`

const NewPickup = ({ isOpen, setIsOpen, ...props }) => {
  const { imageUrl, foundPiece, scanToken, scanStage } = useSelector(
    state => state.scan
  )
  const { scanRoute } = useSelector(state => state.user)

  let resizeImage = useImageResize()
  const { error, sendRequest, clearError } = useApiClient()
  const [showFoundScreen, setShowFoundScreen] = useState(false)
  const [submittedMissingPiece, setSubmittedMissingPiece] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      dispatch(setScanStage('ERROR'))
    }
  })

  useEffect(() => {
    if (scanStage === 'READY') {
      history.push(scanRoute)
    }
  }, [scanStage, history, scanRoute])

  // start the scan when the page loads, if the piece image is set
  useEffect(() => {
    const startScan = async () => {
      try {
        if (imageUrl) {
          dispatch(startScanning())

          let resizedImage = await resizeImage(imageUrl)

          let { signedUrl, imageFilepath } = await sendRequest({
            url: '/auth/sign-s3',
            method: 'POST',
            data: {
              fileName: resizedImage.name,
              fileType: resizedImage.type,
            },
          })

          await sendRequest({
            url: signedUrl,
            method: 'PUT',
            data: resizedImage,
          })

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
    sendRequest,
    dispatch,
    history,
    scanStage,
    scanRoute,
    resizeImage,
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
        <CenteredGrid>
          <Grid item>
            <Grid container justify="center">
              <Grid item xs={10}>
                <Typography variant="h6">{error}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button onClick={handleClose}>Close</Button>
          </Grid>
        </CenteredGrid>
      )
    } else if (scanStage === 'GOING') {
      return (
        <CenteredGrid>
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
      )
    } else if (scanStage === 'COMPLETE') {
      return (
        <>
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
        <CenteredGrid>
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
      )
    } else {
      return <></>
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
