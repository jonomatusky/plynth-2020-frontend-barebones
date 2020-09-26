import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Box, Typography } from '@material-ui/core'

import styled from 'styled-components'
import theme from '../../../theme'

export const PieceBox = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
  background: ${theme.palette.background.card};
`

export const Bar = styled(Grid)`
  background: ${theme.palette.secondary.main};
  color: ${theme.palette.background.paper};
`

export const BarTitle = styled(Grid)`
  font-weight: bold;
  padding-left: 0.5rem;
`

export const BarAction = styled.button`
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
  margin: 0.75rem 0rem;
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

export const ProfileTopRow = styled(Grid)`
  display: flex;
  padding-top: 2rem;
  padding-bottom: 2rem;
`

// const ImageCropper = styled.div`
//   width: 100px;
//   height: 100px;
//   position: relative;
//   overflow: hidden;
//   border-radius: 50%;
//   margin: 0 auto;
// `

// export const AvatarImage = styled.img`
//   width: auto;
//   height: 100%;
//   margin-left: -50px;
// `

// export const Avatar = ({ src, alt }) => {
//   return (
//     <ImageCropper>
//       <AvatarImage src={src} alt={alt} />
//     </ImageCropper>
//   )
// }

export const AvatarBox = styled(Box)`
  color: white;
  text-decoration: none;
  &a {
    color: white;
    text-decoration: none;
  }
  &a:active {
    color: white;
    text-decoration: none;
  }
  &a:focus {
    color: white;
    text-decoration: none;
  }
  &a:visited {
    color: white;
    text-decoration: none;
  }
`

export const AvatarTypography = styled(Typography)`
  color: white;
  text-decoration: none;
  &a {
    color: white;
    text-decoration: none;
  }
  &a:active {
    color: white;
    text-decoration: none;
  }
  &a:focus {
    color: white;
    text-decoration: none;
  }
  &a:visited {
    color: white;
    text-decoration: none;
  }
  &a:hover {
    color: white;
    text-decoration: none;
  }
  &:hover {
    color: white;
    text-decoration: none;
  }
`

export const UnstyledLink = styled(Link)`
  color: inherit;
  ${props => `text-decoration: ${props.textDecoration || `none`};`}
  &:active {
    color: white;
    text-decoration: none;
  }
  &:focus {
    color: white;
    text-decoration: none;
  }
  &:visited {
    color: white;
    text-decoration: none;
  }
  &:hover {
    color: white;
    text-decoration: none;
  }
`
