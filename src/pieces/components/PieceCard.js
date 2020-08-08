import React, { useState, useEffect } from 'react'

import { Grid, Box, Button, Typography, Avatar } from '@material-ui/core'
import styled from 'styled-components'

import { useHttpClient } from '../../shared/hooks/http-hook'

import { BarRow } from '../../shared/components/UIElements/CardSections'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import PieceForm from '../components/PieceForm'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import theme from '../../theme'
import LoadingGraphic from '../../shared/components/UIElements/LoadingGraphic'

const { REACT_APP_BACKEND_URL, REACT_APP_ASSET_URL } = process.env

const PieceBox = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
  background: ${theme.palette.background.paper};
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

const PieceCard = ({ piece, onClose, ...props }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [editMode, setEditMode] = useState(false)

  const cancelEditMode = event => {
    setEditMode(false)
  }

  const enterEditMode = event => {
    setEditMode(true)
  }

  const handleDeletePiece = () => {
    return
  }

  const onSubmit = async formData => {
    try {
      const pieceData = { pieceData: formData }
      await sendRequest(
        `${REACT_APP_BACKEND_URL}/pieces/${piece.id}`,
        'PATCH',
        JSON.stringify(pieceData),
        {
          'Content-Type': 'application/json',
        }
      )
      setEditMode(false)
    } catch (err) {}
  }

  const TopBar = () => {
    let title = !editMode ? piece.group || '' : 'Edit your piece'
    let onClick = !editMode ? onClose : cancelEditMode
    let buttonLabel = !editMode ? 'Close X' : 'Cancel X'

    return <BarRow title={title} onClick={onClick} buttonLabel={buttonLabel} />
  }

  const BottomBar = () => {
    if (props.loggedOut) {
      return (
        <BottomRow container justify="center">
          <Grid>
            <Button color="inherit" href="/signup">
              Get the Pynth App for More
            </Button>
          </Grid>
        </BottomRow>
      )
    } else if (editMode) {
      return (
        <BottomRow container justify="center">
          <Grid>
            <Button color="inherit" onClick={handleDeletePiece}>
              Delete This Piece
            </Button>
          </Grid>
        </BottomRow>
      )
    } else {
      return (
        <BottomRow container justify="center">
          <Grid>
            <Button color="inherit" onClick={enterEditMode}>
              Edit Your Piece
            </Button>
          </Grid>
        </BottomRow>
      )
    }
  }

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Box height="4vh"></Box>
        <PieceBox container direction="column">
          <TopBar />
          {!editMode && (
            <Box>
              <TopRow container>
                <ImageBox item xs={6}>
                  <PieceImage
                    src={`${REACT_APP_ASSET_URL}/${piece.imageFilepath}`}
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
                      <PieceTitle variant="h5">{piece.title}</PieceTitle>
                    </Box>
                    <CardRow
                      container
                      direction="row"
                      wrap="nowrap"
                      alignItems="center"
                    >
                      <Box padding="0.5rem 0.75rem">
                        <Avatar
                          alt={piece.owner.displayName}
                          src={piece.owner.avatar}
                        />
                      </Box>
                      <Box flexGrow={1} paddingRight="0.5rem">
                        <Typography variant="subtitle2">
                          <strong>
                            {piece.creatorDemo || piece.owner.displayName}
                          </strong>
                        </Typography>
                      </Box>
                    </CardRow>
                  </TitleText>
                </TitleBox>
              </TopRow>
              <CardRow container justify="center">
                <DescriptionBox item xs={11}>
                  <DescriptionText>{piece.description}</DescriptionText>
                </DescriptionBox>
              </CardRow>
              {piece.links.map(link => {
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
              {/* <CardRow container justify="center">
                  <ActionButton
                    variant="text"
                    label="+ Share This Piece"
                    onClick={() => {}}
                    color="secondary"
                  />
                </CardRow> */}
            </Box>
          )}
          {editMode && <PieceForm pieceId={piece.id} onSubmit={onSubmit} />}
          <BottomBar />
        </PieceBox>
        <Box height="4vh"></Box>
      </Grid>
    </Grid>
  )
}

export default PieceCard
export { TitleBox, CardRow }
