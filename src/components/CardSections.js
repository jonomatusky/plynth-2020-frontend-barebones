import React, { useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import { Grid, Box, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'

import { AuthContext } from 'contexts/auth-context'
import theme from 'theme'

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

export const BarAction = styled(Button)`
  background: none;
  border: none;
  padding: 0.1rem;
  padding-right: 0.5rem;
  text-transform: none;
  color: ${theme.palette.background.paper};
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
  line-height: 1;
  overflow-wrap: break-word;
`

export const CardRow = styled(Grid)`
  border-top: 1px solid ${theme.palette.secondary.main};
`

export const DescriptionBox = styled(Grid)`
  margin: 1em 0em 1em 0em;
`

export const DescriptionText = styled(Typography)`
  line-height: 1.5;
  white-space: pre-line;
  overflow-wrap: break-word;
`

export const LinkRow = styled(Grid)`
  margin: 0.6rem 0rem;
`

export const BottomRow = styled(Grid)`
  border-top: 1px solid ${theme.palette.secondary.main};
  color: ${theme.palette.secondary.main};
`

export const BarRow = ({ title, buttonLabel, onClose, ...props }) => {
  const lastLocation = useLastLocation()
  const history = useHistory()
  const location = useLocation()
  const { authStatus } = useContext(AuthContext)

  const handleClose = event => {
    event.preventDefault()

    const { referrer } = location.state || {}

    if (!!referrer) {
      history.push(referrer)
    } else if (!!onClose) {
      onClose()
    } else if (!lastLocation && authStatus === 'authenticated') {
      history.push('/admin/pieces')
    } else if (!lastLocation) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  return (
    <Box bgcolor="secondary.main" color="background.paper">
      <Grid container justify="space-between">
        <BarTitle>
          <Typography color="inherit">{title}</Typography>
        </BarTitle>
        <Grid>
          <BarAction onClick={handleClose} {...props}>
            <Typography color="inherit">{buttonLabel}</Typography>
          </BarAction>
        </Grid>
      </Grid>
    </Box>
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
