import React, { useEffect, useState, useReducer } from 'react'
import { Dialog, Fade } from '@material-ui/core'
import styled from 'styled-components'

import image from 'images/loading-demo-image.jpeg'
import loadingAnimationDots from 'images/loading-animation-dots.svg'
import loadingAnimationLines from 'images/loading-animation-lines.svg'
import loadingAnimationInner from 'images/loading-animation-inner.svg'
import loadingAnimationOuter from 'images/loading-animation-outer.svg'
import loadingAnimationOutline from 'images/loading-animation-outline.svg'
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
  showDots: false,
  showLines: false,
  showBackgroundInnter: false,
  showBackgroundOuter: false,
  duration: 1000,
  next: 'build',
}

const reducer = (state, action) => {
  switch (action.stage) {
    case 'image':
      return {
        name: 'image',
        showBuild: false,
        showDots: false,
        showLines: false,
        showOutline: false,
        showBackgroundInner: false,
        showBackgroundOuter: false,
        duration: 1000,
        next: 'build',
      }
    case 'build':
      return {
        name: 'build',
        showBuild: true,
        showDots: true,
        showLines: true,
        showOutline: true,
        showBackgroundInner: true,
        showBackgroundOuter: true,
      }
    case 'loading':
      return {
        name: 'loading',
        showBuild: false,
        showDots: false,
        showLines: false,
        showOutline: true,
        showBackgroundInner: true,
        showBackgroundOuter: true,
        next: 'show',
      }
    case 'show':
      return {
        name: 'show',
        showBuild: false,
        showDots: false,
        showLines: false,
        showOutline: true,
        showBackgroundInner: false,
        showBackgroundOuter: true,
        duration: 200,
        next: 'image',
      }
    default:
      throw new Error()
  }
}

const ScanLoadingScreenDemo = ({ open, onClose }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [isOpen, setIsOpen] = useState(true)

  const [showPulse, setShowPulse] = useState(false)

  const [loadingCount, setLoadingCount] = useState(0)

  useEffect(() => {
    console.log(state.name)

    let timer
    if (state.duration) {
      timer = setTimeout(() => {
        dispatch({ stage: state.next })
      }, state.duration)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [state])

  useEffect(() => {
    if (state.name === 'loading') {
      let timer
      if (loadingCount < 3) {
        timer = setTimeout(() => {
          setShowPulse(!showPulse)
          console.log(loadingCount)
          setLoadingCount(loadingCount + 1)
        }, 500)
      } else {
        setLoadingCount(0)
        dispatch({ stage: state.next })
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [state, loadingCount, showPulse])

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
        in={state.showBuild}
        timeout={{ enter: 2000, exit: 2000 }}
        backgroundImage={loadingAnimationOuter}
        onEntered={() => {
          dispatch({ stage: 'loading' })
        }}
      />
      <LoadingScreen
        in={state.showBuild}
        timeout={{ enter: 2000, exit: 2000 }}
        backgroundImage={loadingAnimationInner}
      />
      <LoadingScreen
        in={state.showBuild}
        timeout={{ enter: 2000, exit: 2000 }}
        backgroundImage={loadingAnimationOutline}
      />
      <LoadingScreen
        in={state.showDots}
        timeout={{ enter: 500, exit: 500 }}
        backgroundImage={loadingAnimationDots}
      />
      <LoadingScreen
        in={state.showLines}
        timeout={{ enter: 1000, exit: 500 }}
        backgroundImage={loadingAnimationLines}
      />
    </Dialog>
  )
}

export default ScanLoadingScreenDemo
