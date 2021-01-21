import React from 'react'
import { Grid, Typography, Hidden } from '@material-ui/core'

import CenteredGrid from 'layouts/CenteredGrid'
import PickupButton from 'components/PickupButton'

const PickupTest = () => {
  return (
    <>
      <Hidden smDown>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          style={{ height: '80vh' }}
          spacing={1}
        >
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
        </Grid>
      </Hidden>
      <Hidden mdUp>
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
      </Hidden>
    </>
  )
}

export default PickupTest
