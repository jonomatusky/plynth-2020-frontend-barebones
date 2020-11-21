import React, { useEffect, useState, useReducer } from 'react'
import { Dialog, Fade } from '@material-ui/core'
import styled from 'styled-components'

import image from 'images/loading-demo-image.jpeg'
import loadingAnimationDotsInner from 'images/loading-animation-dots-inner.svg'
import loadingAnimationDotsOuter from 'images/loading-animation-dots-outer.svg'
import loadingAnimationLines from 'images/loading-animation-lines-inner.svg'
import loadingAnimationInner from 'images/loading-animation-inner.svg'
import loadingAnimationOuter from 'images/loading-animation-outer.svg'
import loadingAnimationOutline from 'images/loading-animation-lines-outer.svg'
// import loadingAnimation from 'images/loading-animation.svg'
import LoadingScreen from './ScanLoadingElement'

const TransitionComponent = React.forwardRef(function Transition(props, ref) {
  return <Fade in={props.open} timeout={500} ref={ref} {...props} />
})

const Image = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const PieceImage = styled(Image)`
  background-image: url(${image});
`

const GrowElement = styled(Image)`
  background-image: url(${props => props.backgroundImage});
  transition: ${props => `${props.duration}ms`};
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
  transform: ${({ state }) => (state === 'exiting' ? 'scale(10)' : 'block')};
`

const initialState = {
  name: 'image',
  showBuild: false,
  showPulse: false,
  showDotsInner: false,
  showDotsOuter: false,
  showLines: false,
  showBackgroundInnter: false,
  showBackgroundOuter: false,
}

const reducer = (state, action) => {
  switch (action.stage) {
    case 'image':
      return {
        name: 'image',
        showDotsInner: false,
        showDotsOuter: false,
        showLines: false,
        showOutline: false,
        showBackgroundInner: false,
        showBackgroundOuter: false,
      }
    case 'dots':
      return {
        name: 'dots',
        showDotsInner: true,
        showDotsOuter: true,
        showLines: false,
        showOutline: false,
        showBackgroundInner: false,
        showBackgroundOuter: false,
      }
    case 'lines':
      return {
        name: 'lines',
        showDotsInner: true,
        showDotsOuter: true,
        showLines: true,
        showOutline: true,
        showBackgroundInner: false,
        showBackgroundOuter: false,
      }
    case 'build':
      return {
        name: 'build',
        showDotsInner: true,
        showDotsOuter: true,
        showLines: true,
        showOutline: true,
        showBackgroundInner: true,
        showBackgroundOuter: true,
      }
    case 'loadingOn':
      return {
        name: 'loadingOn',
        showDotsInner: true,
        showDotsOuter: true,
        showLines: false,
        showOutline: false,
        showBackgroundInner: true,
        showBackgroundOuter: true,
        showPulse: true,
      }
    case 'loadingOff':
      return {
        name: 'loadingOff',
        showDotsInner: true,
        showDotsOuter: true,
        showLines: false,
        showOutline: false,
        showBackgroundInner: true,
        showBackgroundOuter: true,
        showPulse: false,
      }
    case 'loaded':
      return {
        name: 'loaded',
        showDotsInner: false,
        showDotsOuter: true,
        showLines: false,
        showOutline: true,
        showBackgroundInner: false,
        showBackgroundOuter: true,
      }
    case 'reveal':
      return {
        name: 'reveal',
        showDotsInner: false,
        showDotsOuter: false,
        showLines: false,
        showOutline: false,
        showBackgroundInner: false,
        showBackgroundOuter: false,
      }
    default:
      throw new Error()
  }
}

const ScanLoadingScreenDemo = ({ open, onClose }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [isOpen, setIsOpen] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    console.log(state.name)
  }, [state])

  useEffect(() => {
    if (state.name === 'image') {
      const timer = setTimeout(() => {
        dispatch({ stage: 'dots' })
      }, 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [state])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      console.log('LOADED!')
    }, 10000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Dialog
      fullScreen
      open={isOpen}
      TransitionComponent={TransitionComponent}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <PieceImage />
      <LoadingScreen
        in={state.showBackgroundOuter}
        timeout={{ enter: 1000, exit: 1000 }}
        backgroundImage={loadingAnimationOuter}
        onEntered={() => {
          dispatch({ stage: 'loadingOn' })
        }}
        onExited={() => {
          dispatch({ stage: 'image' })
        }}
      />
      <LoadingScreen
        in={state.showBackgroundInner}
        timeout={{ enter: 1000, exit: 1000 }}
        backgroundImage={loadingAnimationInner}
        onExited={() => {
          dispatch({ stage: 'reveal' })
        }}
      />
      <LoadingScreen
        in={state.showLines}
        timeout={{ enter: 500, exit: 1000 }}
        backgroundImage={loadingAnimationLines}
      />
      <LoadingScreen
        in={state.showOutline}
        timeout={{ enter: 1000, exit: 1000 }}
        backgroundImage={loadingAnimationOutline}
        onEntered={() => {
          dispatch({ stage: 'loadingOn' })
        }}
      />
      <LoadingScreen
        in={state.showDotsInner}
        timeout={{ enter: 500, exit: 0 }}
        backgroundImage={loadingAnimationDotsInner}
      />
      <LoadingScreen
        in={state.showDotsOuter}
        timeout={{ enter: 1000, exit: 0 }}
        backgroundImage={loadingAnimationDotsOuter}
        onEntered={() => {
          dispatch({ stage: 'lines' })
        }}
      />
      <LoadingScreen
        in={state.showPulse}
        timeout={{ appear: 0, enter: 1000, exit: 1000 }}
        backgroundImage={loadingAnimationLines}
        onEntered={() => {
          if (isLoaded) {
            dispatch({ stage: 'loaded' })
            setIsLoaded(false)
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
    </Dialog>
  )
}

export default ScanLoadingScreenDemo
