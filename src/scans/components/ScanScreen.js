import React, { useState, useRef } from 'react'
import { Grid, Fab, Typography } from '@material-ui/core'

import Background from '../../shared/layouts/Background'
import ScanModal from '../pages/ScanModal'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import styled from 'styled-components'

const CenteredGrid = styled(Grid)`
  height: 100%;
`

const ScanScreen = props => {
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
    <>
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
              Take a photo to access your content
            </Typography>
          </Grid>
        </CenteredGrid>
      </Background>
    </>
  )
}

export default ScanScreen
