import React from 'react'
import { Grid } from '@material-ui/core'

import loadingGraphic from '../../../images/Plynth-Loading-GIF.gif'

import styled from 'styled-components'

const CenteredGrid = styled(Grid)`
  height: 100%;
`

const LoadingImage = styled.img`
  width: 5em;
  height: 5em;
`

const LoadingGraphic = props => {
  return (
    <CenteredGrid container direction="column" align="center" justify="center">
      <Grid item>
        <LoadingImage src={loadingGraphic} alt="Loading" />
      </Grid>
    </CenteredGrid>
  )
}

export default LoadingGraphic