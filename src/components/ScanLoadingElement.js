import React from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

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

const LoadingElement = styled(Image)`
  background-image: url(${props => props.backgroundImage});
  &.${props => props.transitionName}-enter & {
    opacity: 0;
  }
  &.${props => props.transitionName}-enter-active & {
    opacity: 1;
    transition: opacity ${props => props.timeout.enter}ms;
  }
  &.${props => props.transitionName}-exit & {
    opacity: 1;
  }
  &.${props => props.transitionName}-exit-active & {
    opacity: 0;
    transition: opacity ${props => props.timeout.exit}ms;
  }
`

const LoadingScreen = ({ timeout, backgroundImage, ...props }) => {
  const transitionName = 'image'

  return (
    <ImageBackground>
      <CSSTransition
        timeout={timeout}
        in={props.in}
        classNames={transitionName}
      >
        <LoadingElement
          timeout={timeout}
          backgroundImage={backgroundImage}
          transitionName={transitionName}
        />
      </CSSTransition>
    </ImageBackground>
  )
}

export default LoadingScreen
