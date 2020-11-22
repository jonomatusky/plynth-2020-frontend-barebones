import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Fab, Typography } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'

import { AuthContext } from 'contexts/auth-context'
import { useScanStore } from 'hooks/store/use-scan-store'

import CenteredGrid from 'layouts/CenteredGrid'
import LogoBar from './components/LogoBar'
import InfoBar from './components/InfoBar'
import ImagePicker from 'components/ImagePicker'

const NewScan = () => {
  const { setImageUrl, clearScan } = useScanStore()
  const auth = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    clearScan()
  }, [clearScan])

  const handleSelect = imageUrl => {
    setImageUrl(imageUrl)
    history.push({ pathname: '/pickup' })
  }

  return (
    <>
      <CenteredGrid>
        {auth.authStatus !== 'authenticated' && <InfoBar />}
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
