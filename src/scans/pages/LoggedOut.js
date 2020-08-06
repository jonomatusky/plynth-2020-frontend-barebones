import React, { useState, useRef } from 'react'
import { Container, Grid, Fab, Button, Typography } from '@material-ui/core'

import ScanModal from './ScanModal'
import AlbumIcon from '@material-ui/icons/Album'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import plynthLogo from '../../images/plynth-logo-white.png'
import loadingGraphic from '../../images/Plynth-Loading-GIF.gif'

import theme from '../../theme'
import styled from 'styled-components'

const Background = styled.div`
  background-image: linear-gradient(
    0deg,
    ${theme.palette.primary.main}50,
    ${theme.palette.primary.main}00
  );
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

const CenteredGrid = styled(Grid)`
  height: 100vh;
`

const StyledFab = styled(Fab)``

const Logo = styled.img`
  opacity: 0.4;
  width: 80vw;
  max-width: 80px;
  &:hover {
    opacity: 0.6;
  }
`

const LogoBar = styled.div`
  top: 'auto';
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  left: 0;
  right: 0;
`

const LogoBox = styled.div``

const LoggedOut = props => {
  const [scanModalIsActive, setScanModalIsActive] = useState(false)
  const [file, setFile] = useState(null)

  const filePickerRef = useRef()

  const filePickerHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  const pickHandler = async event => {
    if (event.target.files && event.target.files.length === 1) {
      setScanModalIsActive(true)
      setFile(event.target.files[0])
    }
    filePickerRef.current.value = ''
  }

  return (
    <React.Fragment>
      <ScanModal
        isOpen={scanModalIsActive}
        setIsOpen={setScanModalIsActive}
        file={file}
        loggedOut={true}
      />
      <input
        id="image"
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accepts=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <Background />
      <Container maxWidth="xs">
        <CenteredGrid
          container
          direction="column"
          align="center"
          justify="center"
          wrap="nowrap"
          spacing={1}
        >
          <Grid item>
            <StyledFab size="large" onClick={filePickerHandler} color="primary">
              <PhotoCameraIcon />
            </StyledFab>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Take a photo to find your piece
            </Typography>
          </Grid>
        </CenteredGrid>
        <LogoBar>
          <LogoBox>
            <a href="http://www.plynth.com">
              <Logo src={plynthLogo} alt="Plynth Logo" />
            </a>
          </LogoBox>
        </LogoBar>
        {/* </Background> */}
      </Container>
    </React.Fragment>
  )
}

export default LoggedOut
