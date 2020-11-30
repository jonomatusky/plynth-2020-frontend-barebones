import { Box } from '@material-ui/core'
import styled from 'styled-components'
import theme from 'theme'

export const SectionLight = styled(Box)`
  heigh: 100%;
  width: 100%;
  color: ${theme.palette.background.default};
  background-color: white;
`

export const SectionDark = styled(SectionLight)`
  color: white;
  background-color: ${theme.palette.background.card};
`
