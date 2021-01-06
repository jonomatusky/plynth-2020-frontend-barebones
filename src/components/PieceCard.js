import React from 'react'
import { Grid, Box, Avatar, Typography, Button } from '@material-ui/core'
import styled from 'styled-components'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { useLogClient } from 'hooks/log-hook'
import { useScanStore } from 'hooks/store/use-scan-store'
import ActionButton from './ActionButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {
  BarRow,
  PieceTitle,
  AvatarBox,
  UnstyledLink,
  DescriptionText,
} from './CardSections'
import theme from 'theme'

const ImageSquare = styled.div`
  background: url(${props => props.url}) no-repeat center;
  background-size: contain;
  text-align: center;
  position: relative;
  width: 100%;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

const PieceCard = ({ piece, onClose, ...props }) => {
  const { sendLog } = useLogClient()
  let { scanToken } = useScanStore()

  const handleLinkClick = async link => {
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
        label={link.text || link.name}
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
      } catch (err) {}
    }

    return (
      <UnstyledLink to={`/${piece.owner.username}`} onClick={handleClick}>
        <Box
          borderTop={1}
          borderColor="secondary.main"
          bgcolor="background.card"
          display="flex"
          alignItems="center"
        >
          <Box padding="0.5rem 0.75rem">
            {piece.owner.avatar ? (
              <Avatar
                alt={piece.owner.displayName}
                src={piece.owner.avatarLink}
                style={{
                  width: theme.spacing(4),
                  height: theme.spacing(4),
                }}
              />
            ) : (
              <AccountCircleIcon />
            )}
          </Box>
          <AvatarBox flexGrow={1} paddingRight="0.5rem">
            <Typography variant="subtitle2">
              <strong>{piece.owner.displayName}</strong>
            </Typography>
          </AvatarBox>
        </Box>
      </UnstyledLink>
    )
  }

  return (
    <Box border={1} borderColor="secondary.main" bgcolor="background.card">
      <Grid container justify="center">
        <Grid item xs={12}>
          <BarRow buttonLabel="Close X" onClose={onClose} />
        </Grid>
        <Grid item xs={12}>
          <Box borderBottom={1} borderColor="secondary.main">
            <Grid container alignItems="stretch">
              <Grid item xs={6}>
                <Box
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  justifyItems="center"
                >
                  <ImageSquare url={piece.imageUrl} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  borderLeft={1}
                  borderColor="secondary.main"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifycontent="center"
                >
                  <Box
                    flex={1}
                    display="flex"
                    alignItems="center"
                    p={0.5}
                    pl={1.5}
                    pr={1}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <PieceTitle variant="h5">
                          <strong>{piece.title}</strong>
                        </PieceTitle>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <OwnerSection owner={piece.owner} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {props.showAnalytics && (
          <Grid item xs={12}>
            <Box borderBottom={1} borderColor="secondary.main">
              <Grid container justify="center">
                <Grid item xs={11} container justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">
                      Pickups: {props.scanCount}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Link clicks: {props.clickCount}
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
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box pt="1.25rem" pb={3}>
            <Grid container justify="center" spacing={3}>
              {piece.isDirect ? (
                <Grid item xs={11}>
                  <DescriptionText>
                    Taking users directly to
                    {piece.directLink
                      ? `: ${piece.directLink}`
                      : ` your profile`}
                  </DescriptionText>
                </Grid>
              ) : (
                <>
                  {!!piece.description && (
                    <Grid item xs={11}>
                      <DescriptionText>{piece.description}</DescriptionText>
                    </Grid>
                  )}
                  {!!piece.links &&
                    piece.links.map(link => {
                      return (
                        <Grid item xs={11} key={link._id}>
                          <LinkButton link={link} />
                        </Grid>
                      )
                    })}
                  {piece.sections.map((section, index) => {
                    return (
                      <Grid container item xs={12} justify="center" key={index}>
                        {section.type === 'divider' && (
                          <Grid item key={index} xs={12}>
                            <Box borderTop={1} borderColor="secondary.main" />
                          </Grid>
                        )}
                        {section.title && (
                          <Grid item key={index} xs={11}>
                            <PieceTitle variant="h6">
                              <strong>{section.title}</strong>
                            </PieceTitle>
                          </Grid>
                        )}
                        {section.text && (
                          <Grid item xs={11}>
                            <DescriptionText>{section.text}</DescriptionText>
                          </Grid>
                        )}
                        {section.link && (
                          <Grid item xs={11}>
                            <LinkButton link={section.link} />
                          </Grid>
                        )}
                        {(section.links || []).length > 0 && (
                          <Grid container justify="center" key={index}>
                            <Grid item xs={11}>
                              <Grid
                                container
                                justify="space-between"
                                spacing={2}
                              >
                                {(section.links || []).map(link => {
                                  return (
                                    <Grid item key={link.url} xs={6}>
                                      <Button
                                        onClick={handleLinkClick}
                                        fullWidth
                                        style={{
                                          paddingRight: 0,
                                          paddingLeft: 0,
                                          paddingTop: 0,
                                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                                          borderRadius: '0',
                                        }}
                                        href={link.url}
                                        target="_blank"
                                      >
                                        <Grid container justify="space-between">
                                          <Grid item>
                                            <Typography
                                              style={{
                                                textTransform: 'none',
                                              }}
                                            >
                                              {link.text || link.name}
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            <ArrowForwardIosIcon
                                              fontSize="small"
                                              color="error"
                                            />
                                          </Grid>
                                        </Grid>
                                      </Button>
                                    </Grid>
                                  )
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                        {(section.users || []).length > 0 && (
                          <Grid container justify="center" key={index}>
                            <Grid item xs={11}>
                              <Grid
                                container
                                justify="space-between"
                                spacing={1}
                              >
                                {section.users.map(user => {
                                  return (
                                    <Grid item key={user._id} xs={6}>
                                      <UnstyledLink to={`/${user.username}`}>
                                        <Grid
                                          container
                                          direction="row"
                                          wrap="nowrap"
                                          alignItems="center"
                                          alignContent="center"
                                          style={{ height: '100%' }}
                                        >
                                          <Grid item>
                                            <Box paddingRight="0.5rem">
                                              <Avatar
                                                alt={user.displayName}
                                                src={user.avatarLink}
                                                style={{
                                                  width: theme.spacing(4),
                                                  height: theme.spacing(4),
                                                }}
                                              />
                                            </Box>
                                          </Grid>
                                          <AvatarBox
                                            flexGrow={1}
                                            paddingRight="0.5rem"
                                          >
                                            <Typography>
                                              <strong>
                                                {user.displayName}
                                              </strong>
                                            </Typography>
                                          </AvatarBox>
                                        </Grid>
                                      </UnstyledLink>
                                    </Grid>
                                  )
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    )
                  })}
                </>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PieceCard
