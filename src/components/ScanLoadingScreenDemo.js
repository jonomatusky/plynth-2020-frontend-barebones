import React, { useEffect, useState } from 'react'
import { Dialog, Fade } from '@material-ui/core'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import image from 'images/loading-demo-image.jpeg'
import loadingAnimationDots from 'images/loading-animation-dots.svg'
import loadingAnimationLines from 'images/loading-animation-lines.svg'
import loadingAnimationInner from 'images/loading-animation-inner.svg'
import loadingAnimationOuter from 'images/loading-animation-outer.svg'
import loadingAnimationOutline from 'images/loading-animation-outline.svg'
// import loadingAnimation from 'images/loading-animation.svg'

const TransitionComponent = React.forwardRef(function Transition(props, ref) {
  return <Fade in={props.open} timeout={500} ref={ref} {...props} />
})

const ImageBackground = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

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

const LoadingElement = styled(Image)`
  background-image: url(${props => props.backgroundImage});
  transition: ${props => `${props.duration}ms`};
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
`

const PulsingElement = styled(Image)`
  background-image: url(${props => props.backgroundImage});
  transition: ${props => `${props.duration}ms`};
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0.5)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
`

const GrowElement = styled(Image)`
  background-image: url(${props => props.backgroundImage});
  transition: ${props => `${props.duration}ms`};
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
  transform: ${({ state }) => (state === 'exiting' ? 'scale(10)' : 'block')};
`

const LoadingScreen = ({ duration, backgroundImage, ...props }) => {
  return (
    <ImageBackground>
      <Transition timeout={duration} {...props}>
        {state => (
          <LoadingElement
            state={state}
            backgroundImage={backgroundImage}
            duration={duration}
          />
        )}
      </Transition>
    </ImageBackground>
  )
}

// const LoadingStageOne = () => {
//   timeout = {
//     appear: 500,
//     enter: 300,
//     exit: 300,
//   }

//   return (
//     <ImageBackground>
//       <Transition timeout={}></Transition>
//     </ImageBackground>
//   )
// }

const ScanLoadingScreenDemo = ({ open, onClose }) => {
  const [isOpen, setIsOpen] = useState(true)

  const [loadingStatus, setLoadingStatus] = useState('image')
  const [loadingIndex, setLoadingIndex] = useState(0)
  const [loadingCount, setLoadingCount] = useState(0)
  const [showDots, setShowDots] = useState(false)
  const [showLines, setShowLines] = useState(false)
  const [showBackgroundInner, setShowBackgroundInner] = useState(false)
  const [showBackgroundOuter, setShowBackgroundOuter] = useState(false)
  const [showOutline, setShowOutline] = useState(false)

  const handleReset = () => {
    setLoadingIndex(0)
  }

  // {
  //   loadingStatus: 'loadingOn',
  //   setFunction: () => {
  //     if (loadingCount <= 3) {
  //       setShowLines(true)
  //       setShowDots(true)
  //       console.log(loadingCount)
  //       setLoadingIndex(loadingIndex - 1)
  //       setLoadingCount(loadingCount + 1)
  //     } else {
  //       setShowLines(false)
  //       setShowDots(false)
  //       setShowBackgroundInner(false)
  //       setLoadingIndex(loadingIndex + 1)
  //       setLoadingCount(0)
  //     }
  //   },
  //   duration: 600,
  // },
  // {
  //   loadingStatus: 'loadingOff',
  //   setFunction: () => {
  //     setShowLines(false)
  //     setShowDots(false)
  //     setLoadingIndex(loadingIndex + 1)
  //   },
  //   duration: 1000,
  // },

  useEffect(() => {
    const loadingStages = [
      {
        loadingStatus: 'build',
        setFunction: () => {
          setShowDots(true)
          setShowLines(true)
          setShowBackgroundInner(true)
          setShowBackgroundOuter(true)
          setShowOutline(true)
          setLoadingIndex(loadingIndex + 1)
        },
        duration: 0,
      },
      // {
      //   loadingStatus: 'lines',
      //   setFunction: () => {
      //     setShowLines(true)
      //     setLoadingIndex(loadingIndex + 1)
      //   },
      //   duration: 1000,
      // },
      {
        loadingStatus: 'loading',
        setFunction: () => {
          setLoadingIndex(loadingIndex + 1)
        },
        duration: 750,
      },
      {
        loadingStatus: 'loading',
        setFunction: () => {
          setShowBackgroundInner(false)
          setLoadingIndex(loadingIndex + 1)
        },
        duration: 3000,
      },
      {
        loadingStatus: 'showSecond',
        setFunction: () => {
          setShowBackgroundInner(false)
          setShowDots(false)
          setShowLines(false)
          setLoadingIndex(loadingIndex + 1)
        },
        duration: 200,
      },
      {
        loadingStatus: 'image',
        setFunction: () => {
          setShowOutline(false)
          setShowBackgroundOuter(false)
          setLoadingIndex(0)
        },
        duration: 500,
      },
    ]

    const timer = setTimeout(() => {
      loadingStages[loadingIndex].setFunction()
      console.log(loadingStages[loadingIndex].loadingStatus)
    }, loadingStages[loadingIndex].duration)

    return () => {
      clearTimeout(timer)
    }
  }, [loadingIndex, loadingCount])

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
        in={showBackgroundOuter}
        duration={1500}
        backgroundImage={loadingAnimationOuter}
      />
      <LoadingScreen
        in={showBackgroundInner}
        duration={1500}
        backgroundImage={loadingAnimationInner}
      />
      <LoadingScreen
        in={showOutline}
        duration={500}
        backgroundImage={loadingAnimationOutline}
      />
      <LoadingScreen
        in={showDots}
        duration={500}
        backgroundImage={loadingAnimationDots}
      />
      <LoadingScreen
        in={showLines}
        duration={1000}
        backgroundImage={loadingAnimationLines}
      />
    </Dialog>
  )
}

export default ScanLoadingScreenDemo
