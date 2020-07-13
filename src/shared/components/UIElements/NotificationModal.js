import React from 'react'

import { Dialog, Grid, Box, Fade, Grow } from '@material-ui/core'

import styled from 'styled-components'
import theme from '../../../theme'

import foundImage from '../../../images/Plynth-Loading-Final.png'

const FoundImage = styled.img`
  height: 75px;
  width: 75px;
  margin: 2rem;
`

const FoundScreen = styled(Box)`
  background-color: white;
  color: ${theme.palette.primary.main};
  fontWeight="bold";
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={props.open} timeout={500} ref={ref} {...props} />
})

const NotificationModal = props => {
  return (
    <Dialog fullScreen open={props.open} TransitionComponent={Transition}>
      <FoundScreen>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <Grow in={props.open} timeout={500}>
            <Grid item xs={3} align="center">
              <Box fontWeight="bold">
                <FoundImage src={foundImage} />
                {/* <Typography variant="h5">FOUND!</Typography> */}
              </Box>
            </Grid>
          </Grow>
        </Grid>
      </FoundScreen>
    </Dialog>
  )
}

export default NotificationModal
