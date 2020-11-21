import React, { useEffect, useState, useReducer } from 'react'
import { Dialog, Grid, Button } from '@material-ui/core'
import styled from 'styled-components'

import { useScanStore } from 'hooks/store/use-scan-store'

import loadingAnimationDotsInner from 'images/loading-animation-dots-inner.svg'
import loadingAnimationDotsOuter from 'images/loading-animation-dots-outer.svg'
import loadingAnimationLines from 'images/loading-animation-lines-inner.svg'
import loadingAnimationOutline from 'images/loading-animation-lines-outer.svg'
import LoadingScreen from './ScanLoadingElement'
import theme from 'theme'

const Background = styled.div`
  background-color: black;
  background-image: linear-gradient(
    0deg,
    ${theme.palette.primary.main}70,
    ${theme.palette.primary.main}00
  );
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

const BottomBar = styled.div`
  top: 'auto';
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  left: 0;
  right: 0;
`

const initialState = {
  name: 'image',
  showImage: true,
  showBuild: false,
  showPulse: false,
  showDotsInner: false,
  showDotsOuter: false,
  showLines: false,
}

const reducer = (state, action) => {
  switch (action.stage) {
    case 'image':
      return {
        name: 'image',
        showImage: true,
        showDotsInner: false,
        showDotsOuter: false,
        showLines: false,
        showOutline: false,
      }
    case 'dots':
      return {
        name: 'dots',
        showImage: true,
        showDotsInner: true,
        showDotsOuter: true,
        showLines: false,
        showOutline: false,
      }
    case 'lines':
      return {
        name: 'lines',
        showImage: true,
        showDotsInner: true,
        showDotsOuter: true,
        showLines: true,
        showOutline: true,
      }
    case 'build':
      return {
        name: 'build',
        showImage: false,
        showDotsInner: true,
        showDotsOuter: true,
        showLines: true,
        showOutline: true,
      }
    case 'loadingOn':
      return {
        name: 'loadingOn',
        showDotsInner: true,
        showDotsOuter: true,
        showLines: false,
        showOutline: false,
        showPulse: true,
      }
    case 'loadingOff':
      return {
        name: 'loadingOff',
        showDotsInner: true,
        showDotsOuter: true,
        showLines: false,
        showOutline: false,
        showPulse: false,
      }
    case 'reveal':
      return {
        name: 'reveal',
        showDotsInner: false,
        showDotsOuter: false,
        showLines: false,
        showOutline: false,
      }
    default:
      throw new Error()
  }
}

const ScanLoadingScreenDemo = ({ open, onClose }) => {
  const { status, clearScan, imageUrl } = useScanStore()
  const [state, dispatch] = useReducer(reducer, initialState)

  const [isOpen, setIsOpen] = useState(open || false)

  const handleClose = () => {
    clearScan()
    setIsOpen(false)
    dispatch({ stage: 'image' })
    onClose && onClose()
  }

  useEffect(() => {
    console.log(state.name)
  }, [state])

  useEffect(() => {
    if (status === 'loading') {
      setIsOpen(true)
    } else if (status === 'idle') {
      dispatch({ stage: 'image' })
    }
  }, [status])

  return (
    <Dialog fullScreen open={isOpen}>
      <Background />
      <LoadingScreen
        in={state.showImage && !!imageUrl}
        timeout={{ enter: 500, exit: 1000 }}
        backgroundImage={imageUrl}
        onEntering={() => {
          console.log('entering')
        }}
        onEntered={() => {
          dispatch({ stage: 'dots' })
          console.log('switching to dots')
        }}
        appear
      />
      <LoadingScreen
        in={state.showLines}
        timeout={{ enter: 500, exit: 1000 }}
        backgroundImage={loadingAnimationLines}
      />
      <LoadingScreen
        in={state.showOutline}
        timeout={{ enter: 500, exit: 1000 }}
        backgroundImage={loadingAnimationOutline}
        onEntered={() => {
          dispatch({ stage: 'loadingOn' })
        }}
      />
      <LoadingScreen
        in={state.showDotsInner}
        timeout={{ enter: 500, exit: 1000 }}
        backgroundImage={loadingAnimationDotsInner}
      />
      <LoadingScreen
        in={state.showDotsOuter}
        timeout={{ enter: 500, exit: 1000 }}
        backgroundImage={loadingAnimationDotsOuter}
        onEntered={() => {
          dispatch({ stage: 'lines' })
        }}
        onExited={() => {
          setIsOpen(false)
        }}
      />
      <LoadingScreen
        in={state.showPulse}
        timeout={{ appear: 0, enter: 1000, exit: 1000 }}
        backgroundImage={loadingAnimationLines}
        onEntered={() => {
          if (status === 'succeeded' || status === 'failed') {
            dispatch({ stage: 'reveal' })
          } else {
            dispatch({ stage: 'loadingOff' })
          }
        }}
        onExited={() => {
          if (state.name === 'loadingOff') {
            dispatch({ stage: 'loadingOn' })
          }
        }}
      />
      <LoadingScreen
        in={state.showPulse}
        timeout={{ appear: 0, enter: 1000, exit: 1000 }}
        backgroundImage={loadingAnimationOutline}
      />
      <BottomBar>
        <Grid container direction="column" alignItems="center" spacing={0}>
          <Grid item>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </BottomBar>
    </Dialog>
  )
}

export default ScanLoadingScreenDemo
