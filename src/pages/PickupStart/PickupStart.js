import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Fab, Typography } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'

import { AuthContext } from 'contexts/auth-context'
import { setImageUrl } from 'redux/scanSlice'
import CenteredGrid from 'layouts/CenteredGrid'
import LogoBar from './components/LogoBar'
import ImagePicker from 'components/ImagePicker'

const NewScan = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSelect = imageUrl => {
    dispatch(setImageUrl(imageUrl))
    history.push({ pathname: '/pickup' })
  }

  return (
    <>
      <CenteredGrid>
        <Grid item>
          <ImagePicker onSelect={handleSelect}>
            <Fab size="large" color="primary">
              <PhotoCameraIcon />
            </Fab>
          </ImagePicker>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            Take a photo to access your content
          </Typography>
        </Grid>
        {auth.authStatus !== 'authenticated' && <LogoBar />}
      </CenteredGrid>
    </>
  )
}

export default NewScan
