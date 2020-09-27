import React, { useState, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Fab, Typography, Link } from '@material-ui/core'

import Background from '../../shared/layouts/Background'
import ScanModal from './ScanModal'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import plynthLogo from '../../images/plynth-logo-white.png'
import styled from 'styled-components'

const CenteredGrid = styled(Grid)`
  height: 100%;
`

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
      setFile(event.target.files[0])
      setScanModalIsActive(true)
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
        accept=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <Background>
        <CenteredGrid
          container
          direction="column"
          align="center"
          justify="center"
          wrap="nowrap"
          spacing={1}
        >
          <Grid item>
            <Fab size="large" onClick={filePickerHandler} color="primary">
              <PhotoCameraIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Take a photo to find your piece
            </Typography>
          </Grid>
        </CenteredGrid>
        <LogoBar>
          <Grid container direction="column" alignItems="center" spacing={0}>
            <Grid item>
              <a href="http://www.plynth.com">
                <Logo src={plynthLogo} alt="Plynth Logo" />
              </a>
            </Grid>
            <Grid item>
              <Typography>
                {`Already have an account? `}
                <Link
                  component={RouterLink}
                  to="/s/login"
                  color="inherit"
                  underline="always"
                >
                  Sign In
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </LogoBar>
      </Background>
    </React.Fragment>
  )
}

export default LoggedOut
