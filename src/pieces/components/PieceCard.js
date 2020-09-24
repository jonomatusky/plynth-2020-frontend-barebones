import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Grid, Box, Button, Avatar } from '@material-ui/core'

import { BarRow } from '../../shared/components/ui/CardSections'
import ActionButton from '../../shared/components/ui/ActionButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { AuthContext } from '../../shared/context/auth-context'

import {
  PieceBox,
  TopRow,
  ImageBox,
  PieceImage,
  TitleBox,
  TitleText,
  PieceTitle,
  CardRow,
  AvatarBox,
  AvatarTypography,
  UnstyledLink,
  DescriptionBox,
  DescriptionText,
  LinkRow,
  BottomRow,
} from '../../shared/components/ui/CardSections'

const PieceCard = ({ piece, onClose, ...props }) => {
  const auth = useContext(AuthContext)
  const history = useHistory()

  const BottomBar = () => {
    if (props.loggedOut) {
      return (
        <BottomRow container justify="center">
          <Grid item>
            <Button component={Link} color="inherit" to="/signup">
              Sign Up to Save to your Collection
            </Button>
          </Grid>
        </BottomRow>
      )
    } else if (piece.owner.id === auth.user.id) {
      return (
        <BottomRow container justify="center">
          <Grid item>
            <Button
              color="inherit"
              onClick={() => {
                history.push(`/admin/pieces/${piece.id}/edit`)
              }}
            >
              Edit Your Piece
            </Button>
          </Grid>
        </BottomRow>
      )
    } else {
      return null
    }
  }

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Box height="4vh"></Box>
        <PieceBox container direction="column">
          <BarRow onClick={onClose} buttonLabel="Close X" />
          <TopRow container>
            <ImageBox item xs={6}>
              <PieceImage src={piece.imageUrl} alt="Preview" />
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
                <UnstyledLink to={`/${piece.owner.username}`}>
                  <CardRow
                    container
                    direction="row"
                    wrap="nowrap"
                    alignItems="center"
                  >
                    <Box padding="0.5rem 0.75rem">
                      {piece.owner.avatar ? (
                        <Avatar
                          alt={piece.owner.displayName}
                          src={piece.owner.avatarLink}
                        />
                      ) : (
                        <AccountCircleIcon />
                      )}
                    </Box>
                    <AvatarBox flexGrow={1} paddingRight="0.5rem">
                      <AvatarTypography variant="subtitle2">
                        <strong>{piece.owner.displayName}</strong>
                      </AvatarTypography>
                    </AvatarBox>
                  </CardRow>
                </UnstyledLink>
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
          <Box height="4vh"></Box>
          <BottomBar />
        </PieceBox>
        <Box height="4vh"></Box>
      </Grid>
    </Grid>
  )
}

export default PieceCard
export { TitleBox, CardRow }
