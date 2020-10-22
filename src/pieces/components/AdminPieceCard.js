import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Box, Avatar, Typography } from '@material-ui/core'

import { useLogClient } from '../../shared/hooks/log-hook'
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
  const { sendLog } = useLogClient()
  let { scanToken } = useSelector(state => state.scan)

  const LinkButton = ({ link }) => {
    const handleClick = async () => {
      try {
        if (scanToken) {
          await sendLog({
            url: '/scans',
            data: {
              click: { type: 'link', destination: link.url },
              scanToken,
            },
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
      try {
        if (scanToken) {
          await sendLog({
            url: '/scans',
            data: {
              click: { type: 'profile', destination: `/${owner.username}` },
              scanToken,
            },
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
          <BarRow buttonLabel="Close X" />
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
            <Grid item xs={11}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="subtitle1">
                    Pickups: {props.scanCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Clickups: {props.clickCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Click Rate:{' '}
                    {Math.round((props.clickCount / props.scanCount) * 100) ||
                      0}
                    %
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardRow>
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
