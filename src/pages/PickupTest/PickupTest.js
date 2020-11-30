import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import CenteredGrid from 'layouts/CenteredGrid'
import PickupButton from 'components/PickupButton'

const NewScan = () => {
  return (
    <CenteredGrid>
      {/* {auth.authStatus !== 'authenticated' && <InfoBar />} */}
      <Grid item>
        <PickupButton />
      </Grid>
      <Grid item>
        <Typography variant="h6">
          Take a photo to access your content
        </Typography>
      </Grid>
      {/* {auth.authStatus !== 'authenticated' && <LogoBar />} */}
    </CenteredGrid>
  )
}

export default NewScan
