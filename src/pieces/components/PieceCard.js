import React, { useState, useEffect } from 'react'

import { Grid, Box, Button, Typography, Avatar } from '@material-ui/core'
import styled from 'styled-components'

import { useHttpClient } from '../../shared/hooks/http-hook'

import ActionButton from '../../shared/components/UIElements/ActionButton'
import PieceForm from '../components/PieceForm'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import theme from '../../theme'
import LoadingGraphic from '../../shared/components/UIElements/LoadingGraphic'

const { REACT_APP_BACKEND_URL, REACT_APP_ASSET_URL } = process.env

const PieceContainer = styled(Grid)`
  margin: 1rem 0rem;
`

const PieceBox = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
  background: ${theme.palette.background.paper};
`

const BarRow = styled(Grid)`
  background: ${theme.palette.secondary.main};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: ${theme.palette.background.paper};
`

const BarTitle = styled(Grid)`
  font-weight: bold;
`

const BarAction = styled(Button)`
  padding: 0;
`

const TopRow = styled(Grid)`
  display: flex;
`

const ImageBox = styled(Grid)`
  padding: 0.5rem;
`

const PieceImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 200px;
  object-fit: contain;
`

const TitleBox = styled(Grid)`
  border-left: 1px solid ${theme.palette.secondary.main};
`

const TitleText = styled(Grid)`
  height: 100%;
`

const PieceTitle = styled(Typography)`
  font-weight: bold;
  line-height: 1;
`

const CardRow = styled(Grid)`
  border-top: 1px solid ${theme.palette.secondary.main};
`

const DescriptionBox = styled(Grid)`
  margin: 1.5rem 0rem 1rem 0rem;
`

const DescriptionText = styled(Typography)`
  line-height: 1.5;
`

const LinkRow = styled(Grid)`
  margin: 1.25rem 0rem;
`

const BottomRow = styled(Grid)`
  border-top: 1px solid ${theme.palette.secondary.main};
  color: ${theme.palette.secondary.main};
`

const PieceCard = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedPiece, setLoadedPiece] = useState()
  const [editMode, setEditMode] = useState(false)
  const [cardState, setCardState] = useState({
    mode: 'loading',
    title: '',
    topButtonAction: props.onClose,
    topButtonLabel: 'Cancel X',
    bottomButtonAction: null,
    bottomButtonLabel: '',
  })

  const pieceId = props.pieceId

  const cancelEditMode = event => {
    setEditMode(false)
  }

  const enterEditMode = event => {
    setEditMode(true)
    console.log('edit mode')
  }

  const handleDeletePiece = () => {
    return
  }

  useEffect(() => {
    if (loadedPiece && !editMode) {
      setCardState({
        mode: 'view',
        title: loadedPiece.group || '',
        topButtonAction: props.onClose,
        topButtonLabel: 'Close X',
        bottomButtonAction: enterEditMode,
        bottomButtonLabel: 'Edit Your Piece',
      })
    } else if (loadedPiece && editMode) {
      setCardState({
        mode: 'edit',
        title: 'Edit Your Piece',
        topButtonAction: cancelEditMode,
        topButtonLabel: 'Cancel X',
        bottomButtonAction: handleDeletePiece,
        bottomButtonLabel: 'Delete This Piece',
      })
    }
  }, [loadedPiece, props, editMode])

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

  const onSubmit = async formData => {
    try {
      const pieceData = { pieceData: formData }
      await sendRequest(
        `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`,
        'PATCH',
        JSON.stringify(pieceData),
        {
          'Content-Type': 'application/json',
        }
      )
      setEditMode(false)
    } catch (err) {}
  }

  return (
    <PieceContainer container justify="center">
      <Grid item xs={11}>
        <PieceBox container direction="column">
          <BarRow container justify="space-between">
            <BarTitle>
              <Typography color="inherit">{cardState.title}</Typography>
            </BarTitle>
            <Grid>
              <BarAction color="inherit" onClick={cardState.topButtonAction}>
                {cardState.topButtonLabel}
              </BarAction>
            </Grid>
          </BarRow>
          {cardState.mode === 'loading' && (
            <Box height="80vh">
              <LoadingGraphic />
            </Box>
          )}
          {cardState.mode === 'view' && (
            <Box>
              <TopRow container>
                <ImageBox item xs={6}>
                  <PieceImage
                    src={`${REACT_APP_ASSET_URL}/${loadedPiece.imageFilepath}`}
                    alt="Preview"
                  />
                </ImageBox>
                <TitleBox item xs={6}>
                  <TitleText container direction="column" justify="center">
                    <Box
                      flexGrow={1}
                      display="flex"
                      alignItems="center"
                      padding="1rem"
                    >
                      <PieceTitle variant="h5">{loadedPiece.title}</PieceTitle>
                    </Box>
                    <CardRow
                      container
                      direction="row"
                      wrap="nowrap"
                      alignItems="center"
                    >
                      <Box padding="0.5rem 0.75rem">
                        <Avatar
                          alt={loadedPiece.owner.displayName}
                          src={loadedPiece.owner.avatar}
                        />
                      </Box>
                      <Box flexGrow={1} paddingRight="0.5rem">
                        <Typography variant="subtitle2">
                          <strong>
                            {loadedPiece.creatorDemo ||
                              loadedPiece.owner.displayName}
                          </strong>
                        </Typography>
                      </Box>
                    </CardRow>
                  </TitleText>
                </TitleBox>
              </TopRow>
              <CardRow container justify="center">
                <DescriptionBox item xs={11}>
                  <DescriptionText>{loadedPiece.description}</DescriptionText>
                </DescriptionBox>
              </CardRow>
              {loadedPiece.links.map(link => {
                return (
                  <LinkRow container key={link._id} justify="center">
                    <Grid item xs={11}>
                      <ActionButton
                        target="_blank"
                        href={link.url}
                        label={link.name}
                      />
                    </Grid>
                  </LinkRow>
                )
              })}
              <CardRow container justify="center">
                <ActionButton
                  variant="text"
                  label="+ Share This Piece"
                  onClick={() => {}}
                  color="secondary"
                />
              </CardRow>
            </Box>
          )}
          {cardState.mode === 'edit' && (
            <PieceForm pieceId={pieceId} onSubmit={onSubmit} />
          )}
          {!cardState.bottomButtonAction && <Box height="2rem" />}
          {!!cardState.bottomButtonAction && (
            <BottomRow container justify="center">
              <Grid>
                <Button color="inherit" onClick={cardState.bottomButtonAction}>
                  {cardState.bottomButtonLabel}
                </Button>
              </Grid>
            </BottomRow>
          )}
        </PieceBox>
      </Grid>
    </PieceContainer>
  )
}

export default PieceCard
export { TitleBox, CardRow }
