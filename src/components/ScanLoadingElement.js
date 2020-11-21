import React from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

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
  max-width: 600px;
  margin: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.backgroundImage});
  transition: ${({ state }) => props =>
    state === state.entering
      ? `${props.timeout.enter || props.timeout}ms`
      : `${props.timeout.exit || props.timeout}ms`};
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'block')};
`

const LoadingScreen = ({ timeout, backgroundImage, ...props }) => {
  return (
    <ImageBackground>
      <Transition timeout={timeout} {...props}>
        {state => (
          <LoadingElement
            state={state}
            backgroundImage={backgroundImage}
            timeout={timeout}
          />
        )}
      </Transition>
    </ImageBackground>
  )
}

export default LoadingScreen
