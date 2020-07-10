import React, { useState, useEffect } from 'react'

import { Grid, Box, Paper, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'

import { useHttpClient } from '../../shared/hooks/http-hook'

import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import theme from '../../theme'

const { REACT_APP_BACKEND_URL, REACT_APP_ASSET_URL } = process.env

// const PieceContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `

// const CenterHorizontal = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 90%;
// `

// const CenterVertical = styled.div`
//   display: flex;
//   height: 90%;
// `

// const PieceBox = styled.div`
//   border: 1px;
//   border-style: solid;
//   border-color: ${theme.palette.background.default};
//   background: white;
//   color: black;
//   display: flex;
//   flex-direction: column;
//   margin-top: 5vh;
//   max-width: 502px;
// `

// const TitleRow = styled.div`
//   display: flex;
//   height: 50vw;
//   max-height: 250px;
// `

// const ImageBox = styled.div`
//   width: 50vw;
//   height: 100%;
//   max-width: 250px;
// `

// const PieceImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
// `

// const TitleBox = styled.div`
//   border-left: 1px solid ${theme.palette.background.default};
//   width: 50vw;
//   height: 100%;
//   max-width: 250px;
// `

// const TitleText = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   margin: 10%;
//   height: 80%;
// `

// const DescriptionRow = styled.div`
//   border-top: 1px solid ${theme.palette.background.default};
// `

// const DescriptionText = styled.div`
//   margin: 5%;
// `

// const AlbumTitle = styled(Typography)`
//   font-weight: bold;
// `

const PieceContainer = styled(Grid)``

const PieceBox = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
  margin-top: 5vh;
  background: ${theme.palette.background.paper};
`

const BarRow = styled(Grid)`
  background: ${theme.palette.secondary.main};
  padding-left: 10px;
  padding-right: 10px;
  color: ${theme.palette.background.paper};
`

const BarTitle = styled(Grid)`
  font-weight: bold;
`

const BarAction = styled(Grid)``

const TitleRow = styled(Grid)`
  display: flex;
`

const ImageBox = styled(Grid)`
  padding: 10px;
`

const PieceImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 175px;
  object-fit: contain;
`

const TitleBox = styled(Grid)`
  padding: 20px;
`

const TitleText = styled(Grid)`
  height: 100%;
`

const CardRow = styled(Grid)`
  border-top: 1px solid ${theme.palette.secondary.main};
`

const DescriptionText = styled(Grid)`
  margin: 2rem;
`

const PieceTitle = styled(Typography)`
  font-weight: bold;
`

const LinkRow = styled(Grid)`
  margin: 1rem 2rem;
`

const PieceCard = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedPiece, setLoadedPiece] = useState()

  const pieceId = props.pieceId

  useEffect(() => {
    const fetchPiece = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`
        )
        setLoadedPiece(responseData.piece)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPiece()
  }, [sendRequest, pieceId])

  return (
    <PieceContainer container>
      {(isLoading || !loadedPiece) && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPiece && (
        <PieceBox container direction="column">
          <BarRow container justify="space-between">
            <BarTitle>
              <Typography color="inherit">{loadedPiece.issue || ''}</Typography>
            </BarTitle>
            <Grid>
              <Button color="inherit" onClick={props.onClose}>
                Close X
              </Button>
            </Grid>
          </BarRow>
          <TitleRow container>
            <ImageBox item xs={6}>
              <PieceImage
                src={`${REACT_APP_ASSET_URL}/${loadedPiece.imageFilepath}`}
                alt="Preview"
              />
            </ImageBox>
            <TitleBox item xs={6}>
              <TitleText container direction="column" justify="center">
                <Grid item>
                  <PieceTitle variant="h5">{loadedPiece.title}</PieceTitle>
                  <Typography>{`by ${loadedPiece.owner.displayName}`}</Typography>
                </Grid>
              </TitleText>
            </TitleBox>
          </TitleRow>
          <CardRow container>
            <DescriptionText item xs={12}>
              <Typography>{loadedPiece.description}</Typography>
            </DescriptionText>
          </CardRow>
          {loadedPiece.links.map(link => {
            return (
              <LinkRow>
                <ActionButton
                  target="_blank"
                  href={link.url}
                  label={link.name}
                />
              </LinkRow>
            )
          })}
          <Box height="2rem"></Box>
        </PieceBox>
      )}
    </PieceContainer>
  )
}

export default PieceCard
