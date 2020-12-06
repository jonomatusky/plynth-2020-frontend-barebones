import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Container, Grid, Box, Typography, Button } from '@material-ui/core'

import { useScanStore } from 'hooks/store/use-scan-store'
import { useRequest } from 'hooks/use-request'

import CenteredGrid from 'layouts/CenteredGrid'
import PieceCard from 'components/PieceCard'
import ActionBar from 'components/ActionBar'
import { setScanStatus } from 'redux/scanSlice'

const NewPickup = ({ isOpen, setIsOpen, ...props }) => {
  const {
    startScan,
    status,
    imageUrl,
    foundPiece,
    scanToken,
    error,
  } = useScanStore()

  const { scanRoute } = useSelector(state => state.user)

  const { request } = useRequest()
  const [submittedMissingPiece, setSubmittedMissingPiece] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (status === 'idle') {
      history.push(scanRoute)
    } else if ((foundPiece || {}).directLink) {
      window.location.assign(foundPiece.directLink)
    } else if ((foundPiece || {}).isDirect) {
      history.push({
        pathname: `/${foundPiece.owner.username}`,
        state: { referrer: scanRoute },
      })
      setScanStatus('idle')
    }
  }, [status, history, scanRoute, foundPiece])

  // start the scan when the page loads, if the piece image is set
  useEffect(() => {
    const start = async () => {
      try {
        if (imageUrl) {
          startScan(imageUrl)
        } else {
          history.push(scanRoute)
        }
      } catch (err) {}
    }

    if (status === 'ready') {
      start()
    }
  }, [status, imageUrl, startScan, history, scanRoute])

  const handleClose = () => {
    history.push(scanRoute)
  }

  //change to updateScan
  const handleMissingPiece = () => {
    try {
      request({
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
    if (error) {
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
    } else if (status === 'succeeded' && foundPiece && !foundPiece.isDirect) {
      return (
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
      )
    } else if (status === 'succeeded' && !foundPiece) {
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

  return <Content />
}

export default NewPickup
