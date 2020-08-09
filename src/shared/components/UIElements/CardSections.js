import React from 'react'
import styled from 'styled-components'
import { Grid, Button, Typography } from '@material-ui/core'
import theme from '../../../theme'

export const PieceBox = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
  background: ${theme.palette.background.paper};
`

const Bar = styled(Grid)`
  background: ${theme.palette.secondary.main};
  color: ${theme.palette.background.paper};
`

const BarTitle = styled(Grid)`
  font-weight: bold;
  padding-left: 0.5rem;
`

const BarAction = styled.button`
  background: none;
  border: none;
  padding-right: 0.5rem;
`

export const TopRow = styled(Grid)`
  display: flex;
`

export const ImageBox = styled(Grid)`
  padding: 0.5rem;
`

export const PieceImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 200px;
  object-fit: contain;
`

export const TitleBox = styled(Grid)`
  border-left: 1px solid ${theme.palette.secondary.main};
`

export const TitleText = styled(Grid)`
  height: 100%;
`

export const PieceTitle = styled(Typography)`
  font-weight: bold;
  line-height: 1;
`

export const CardRow = styled(Grid)`
  border-top: 1px solid ${theme.palette.secondary.main};
`

export const DescriptionBox = styled(Grid)`
  margin: 1.5rem 0rem 1rem 0rem;
`

export const DescriptionText = styled(Typography)`
  line-height: 1.5;
`

export const LinkRow = styled(Grid)`
  margin: 1.25rem 0rem;
`

export const BottomRow = styled(Grid)`
  border-top: 1px solid ${theme.palette.secondary.main};
  color: ${theme.palette.secondary.main};
`

export const BarRow = ({ title, buttonLabel, ...props }) => {
  return (
    <Bar container justify="center">
      <Grid container justify="space-between">
        <BarTitle>
          <Typography color="inherit">{title}</Typography>
        </BarTitle>
        <Grid>
          <BarAction {...props}>
            <Typography color="inherit">{buttonLabel}</Typography>
          </BarAction>
        </Grid>
      </Grid>
    </Bar>
  )
}
