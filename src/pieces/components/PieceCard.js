import React, { useState, useEffect } from 'react'

import { Grid, Box, Typography } from '@material-ui/core'
import styled from 'styled-components'

import { useHttpClient } from '../../shared/hooks/http-hook'

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import theme from '../../theme'

const { REACT_APP_BACKEND_URL, REACT_APP_ASSET_URL } = process.env

const PieceContainer = styled.div`
  display: flex;
  justify-content: center;
`

const CenterHorizontal = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`

const CenterVertical = styled.div`
  display: flex;
  height: 90%;
`

const PieceBox = styled.div`
  border: 1px;
  border-style: solid;
  border-color: ${theme.palette.background.default};
  background: white;
  color: black;
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  max-width: 502px;
`

const TitleRow = styled.div`
  display: flex;
  height: 50vw;
  max-height: 250px;
`

const ImageBox = styled.div`
  width: 50vw;
  height: 100%;
  max-width: 250px;
`

const PieceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const TitleBox = styled.div`
  border-left: 1px solid ${theme.palette.background.default};
  width: 50vw;
  height: 100%;
  max-width: 250px;
`

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10%;
  height: 80%;
`

const DescriptionRow = styled.div`
  border-top: 1px solid ${theme.palette.background.default};
`

const DescriptionText = styled.div`
  margin: 5%;
`

const AlbumTitle = styled(Typography)`
  font-weight: bold;
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
    <PieceContainer>
      {(isLoading || !loadedPiece) && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPiece && (
        <PieceBox>
          <TitleRow>
            <ImageBox>
              <PieceImage
                src={`${REACT_APP_ASSET_URL}/${loadedPiece.imageFilepath}`}
                alt="Preview"
              />
            </ImageBox>
            <TitleBox>
              <TitleText>
                <AlbumTitle variant="h4">{loadedPiece.title}</AlbumTitle>
                <Typography>{`by ${loadedPiece.owner.displayName}`}</Typography>
              </TitleText>
            </TitleBox>
          </TitleRow>
          <DescriptionRow>
            <DescriptionText>
              <Typography>{loadedPiece.description}</Typography>
            </DescriptionText>
          </DescriptionRow>
        </PieceBox>
      )}
    </PieceContainer>
  )
}

export default PieceCard
