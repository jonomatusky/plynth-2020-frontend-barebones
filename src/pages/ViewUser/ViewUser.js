import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Grid, Box, Avatar } from '@material-ui/core'
import {
  PieceBox,
  BarRow,
  ProfileTopRow,
  CardRow,
  PieceTitle,
  DescriptionBox,
  DescriptionText,
  LinkRow,
} from 'components/CardSections'
import { makeStyles } from '@material-ui/core/styles'

import { useRequest } from 'hooks/use-request'

import ActionButton from 'components/ActionButton'

import NotFound from 'layouts/NotFound'
import { useLogClient } from 'hooks/log-hook'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const UserProfile = props => {
  const classes = useStyles()
  let { scanToken } = useSelector(state => state.scan)
  const { sendLog } = useLogClient()
  const { status, request } = useRequest()
  const [user, setUser] = useState()
  const username = useParams().username

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await request({
          url: `/users/${username}`,
          quiet: true,
        })
        setUser(responseData.user)
      } catch (err) {}
    }
    fetchUser()
  }, [request, username])

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

  return (
    <>
      {status === 'failed' && <NotFound />}
      {user && status === 'succeeded' && (
        <Container maxWidth="xs">
          <Grid container justify="flex-start" direction="column">
            <Box height="1.5rem"></Box>
            <PieceBox container direction="column">
              <BarRow buttonLabel="Close X" />
              <ProfileTopRow
                container
                alignContent="center"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={5}>
                  <Grid container justify="center">
                    <Grid item>
                      {user.avatar && (
                        <Avatar
                          src={user.avatarLink}
                          alt="Preview"
                          className={classes.large}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <Box textAlign="left" padding={1} overflow="hidden">
                    <PieceTitle variant="h5">{user.displayName}</PieceTitle>
                  </Box>
                </Grid>
              </ProfileTopRow>
              <CardRow container justify="center">
                <DescriptionBox item xs={11}>
                  <DescriptionText>{user.bio}</DescriptionText>
                </DescriptionBox>
              </CardRow>
              {user.links.map(link => {
                return (
                  <LinkRow container key={link._id} justify="center">
                    <Grid item xs={11}>
                      <LinkButton link={link} />
                    </Grid>
                  </LinkRow>
                )
              })}
              <Box height="1rem"></Box>
            </PieceBox>
            <Box height="1.5rem"></Box>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default UserProfile
