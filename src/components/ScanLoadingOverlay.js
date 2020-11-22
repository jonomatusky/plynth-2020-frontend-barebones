import React from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'
import theme from 'theme'

const ImageBackground = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

const LoadingElement = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  background-position: center;
  background-repeat: no-repeat;
  background: ${theme.palette.paper};
`

const LoadingScreen = ({ timeout, backgroundImage, ...props }) => {
  const defaultStyle = {
    entering: { transition: `opacity ${timeout.enter}ms ease-in-out` },
    entered: { transition: `opacity ${timeout.enter}ms ease-in-out` },
    exiting: { transition: `opacity ${timeout.exit}ms ease-in-out` },
    exited: { transition: `opacity ${timeout.exit}ms ease-in-out` },
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }

  return (
    <ImageBackground>
      <Transition timeout={timeout} {...props}>
        {state => (
          <LoadingElement
            state={state}
            backgroundImage={backgroundImage}
            timeout={timeout}
            style={{
              ...defaultStyle[state],
              ...transitionStyles[state],
            }}
          />
        )}
      </Transition>
    </ImageBackground>
  )
}

export default LoadingScreen
