import React from 'react'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: '#212421';
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingSpinner = props => {
  return (
    <Overlay>
      <CircularProgress />
    </Overlay>
  )
}

export default LoadingSpinner
