import React, { useEffect, useState } from 'react'

import { Dialog, Grid, Box, Typography, Button, Fade } from '@material-ui/core'
import styled from 'styled-components'

import theme from 'theme'
import { useScanStore } from 'hooks/store/use-scan-store'
import CenteredGrid from 'layouts/CenteredGrid'
import loadingImage from 'images/Plynth-Loading-GIF.gif'
import foundImage from 'images/Plynth-Loading-Final.png'

const LoadingImage = styled.img`
  height: 50px;
  width: 50px;
`

const FoundImage = styled.img`
  height: 75px;
  width: 75px;
  margin-bottom: 2rem;
`

const FoundScreen = styled(Box)`
  background-color: white;
  color: ${theme.palette.primary.main};
  fontWeight="bold";
`

const Background = styled.div`
  background-color: black;
  background-image: linear-gradient(
    0deg,
    ${theme.palette.primary.main}70,
    ${theme.palette.primary.main}00
  );
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={props.open} timeout={500} ref={ref} {...props} />
})

const ScanLoadingScreen = ({ open, onClose }) => {
  const { status, foundPiece, clearScan } = useScanStore()

  const [isOpen, setIsOpen] = useState(open || false)
  const [showFoundScreen, setShowFoundScreen] = useState(false)

  const handleClose = () => {
    clearScan()
    onClose && onClose()
  }

  useEffect(() => {
    if (status === 'loading') {
      setIsOpen(true)
    } else if (status === 'idle') {
      setIsOpen(false)
    }
  }, [status])

  useEffect(() => {
    if (foundPiece && status === 'succeeded') {
      setShowFoundScreen(true)
      const timer = setTimeout(() => {
        setShowFoundScreen(false)
        setIsOpen(false)
      }, 500)
      return () => {
        clearTimeout(timer)
      }
    } else if (!foundPiece && status === 'succeeded') {
      setIsOpen(false)
    }
  }, [foundPiece, status])

  return (
    <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
      {showFoundScreen ? (
        <FoundScreen>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: '100vh' }}
          >
            {/* <Grow in={props.open} timeout={500}> */}
            <Grid item xs={3} align="center">
              <Box align="center">
                <FoundImage src={foundImage} />
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold">FOUND!</Box>
                </Typography>
              </Box>
            </Grid>
            {/* </Grow> */}
          </Grid>
        </FoundScreen>
      ) : (
        <>
          <Background>
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
          </Background>
        </>
      )}
    </Dialog>
  )
}

export default ScanLoadingScreen
