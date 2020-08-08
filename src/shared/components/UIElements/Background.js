import styled from 'styled-components'
import theme from '../../../theme'

const Background = styled.div`
  background-image: linear-gradient(
    0deg,
    ${theme.palette.primary.main}50,
    ${theme.palette.primary.main}00
  );
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

export default Background
