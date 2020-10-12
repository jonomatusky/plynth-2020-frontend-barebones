import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Fab, Typography } from '@material-ui/core'

import { setImageUrl } from '../../redux/scanSlice'
import Background from '../../shared/layouts/Background'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import styled from 'styled-components'

const CenteredGrid = styled(Grid)`
  height: 100%;
`

const ScanScreen = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const filePickerRef = useRef()

  const filePickerHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  const pickHandler = async event => {
    const { files } = event.target
    if ((files || []).length === 1) {
      const imageUrl = window.URL.createObjectURL(files[0])
      dispatch(setImageUrl(imageUrl))
      history.push('/pickup')
    }
    filePickerRef.current.value = ''
  }

  return (
    <>
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
