import React from 'react'
import { Grid, Box, Avatar } from '@material-ui/core'

import { useApiClient } from '../../shared/hooks/api-hook'
import { BarRow } from '../../shared/components/ui/CardSections'
import ActionButton from '../../shared/components/ui/ActionButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
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
} from '../../shared/components/ui/CardSections'
import BottomBar from './PieceCardBottomBar'

const PieceCard = ({ piece, onClose, ...props }) => {
  const { sendRequest } = useApiClient()
  let scanToken = sessionStorage.getItem('scanToken')

  const LinkButton = ({ link }) => {
    const handleClick = async () => {
      try {
        if (scanToken) {
          await sendRequest('/scans', 'PATCH', {
            click: { type: 'link', destination: link.url },
            scanToken,
          })
        }
      } catch (err) {}
    }

    return (
      <ActionButton
        onClick={handleClick}
        target="_blank"
        href={link.url}
        label={link.name}
      />
    )
  }

  const OwnerSection = ({ owner }) => {
    const handleClick = async () => {
      console.log('clicked: owner profile')
      try {
        if (scanToken) {
          await sendRequest('/scans', 'PATCH', {
            click: { type: 'profile', destination: `/${owner.username}` },
            scanToken,
          })
        }
      } catch (err) {
        console.log(err)
      }
    }

    return (
      <UnstyledLink to={`/${piece.owner.username}`} onClick={handleClick}>
        <CardRow container direction="row" wrap="nowrap" alignItems="center">
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
    )
  }

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Box height="1rem"></Box>
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
                <OwnerSection owner={piece.owner} />
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
                  <LinkButton link={link} />
                </Grid>
              </LinkRow>
            )
          })}
          <Box height="1rem"></Box>
          <BottomBar piece={piece} />
        </PieceBox>
        <Box height="1rem"></Box>
      </Grid>
    </Grid>
  )
}

export default PieceCard
export { TitleBox, CardRow }
