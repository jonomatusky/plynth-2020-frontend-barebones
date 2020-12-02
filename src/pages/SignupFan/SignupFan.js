import React, { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  Container,
  Grid,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Hidden,
  Button,
} from '@material-ui/core'
import styled from 'styled-components'
import { ThemeProvider } from '@material-ui/core/styles'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'

import Emoji from 'components/Emoji'
import ActionButton from 'components/ActionButton'
import theme, { lightTheme } from 'theme'

import { SectionLight, SectionDark } from 'layouts/PageSections'
import cardImage from 'images/postcard_back.png'
import WebsiteNavBar from 'components/WebsiteNavBar'

export const AppImage = styled.img`
  max-height: 300px;
  max-width: 100%;
  object-fit: contain;
  object-position: 50% 50%;
  display: block;
`

export const CardImage = styled(AppImage)`
  margin: 20% 0%;
  border: 1px solid #424242;
  transform: rotate(-20deg);
`

const paypal = {
  monthly: { link: 'https://py.pl/fGOTI', label: 'Try 1 month for $5' },
  annual: { link: 'https://py.pl/1FwDqe', label: 'Try 12 months for $36' },
}

const SignUp = () => {
  const location = useLocation()
  const [billing, setBilling] = useState('annual')

  let vh = window.innerHeight * 0.01

  document.documentElement.style.setProperty('--vh', `${vh}px`)

  const handleChange = event => {
    setBilling(event.target.value)
  }

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Container disableGutters maxWidth={false}>
          <SectionLight
            style={{ minHeight: '100vh', height: 'calc(var(--vh, 1vh) * 100)' }}
          >
            <WebsiteNavBar
              position="static"
              left={
                <Grid item xs={1}>
                  <Grid container justify="flex-start">
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to="/"
                        startIcon={<PhotoCameraIcon />}
                        style={{ textTransform: 'none' }}
                      >
                        Home
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              }
              right={
                <Grid item xs={1}>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to={{
                          pathname: '/admin/login',
                          state: { referrer: location.pathname },
                        }}
                        style={{ textTransform: 'none' }}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              }
            />
            <Grid container justify="center">
              <Hidden smDown>
                <Grid item xs={12}>
                  <Box height={theme.spacing(8)} />
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <Grid item xs={12}>
                  <Box height={theme.spacing(2)} />
                </Grid>
              </Hidden>
              <Grid item md={10} sm={8} xs={11}>
                <Grid container justify="space-around" spacing={3}>
                  <Grid item md={5} xs={11}>
                    <Grid container spacing={2} justify="center">
                      <Grid item xs={12}>
                        {/* <Box color={theme.palette.primary.main}> */}
                        <Typography variant="h3">
                          <b>Join the Club </b>
                          <Emoji symbol="📬" label="mailbox" />
                        </Typography>
                        {/* </Box> */}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          Get a new <b>Postcard Mixtape</b> delivered monthly,
                          <b> starting at $3/month</b>. Scan each postcard on
                          the Plynth app to <b>unlock an exclusive playlist</b>{' '}
                          <Emoji symbol="✨" label="sparkle" />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <i>
                            Subscriptions start in January. Sign up by December
                            25th to get a free <b>Plynth Holiday Postcard</b>.
                          </i>
                        </Typography>
                      </Grid>
                      <Hidden smDown>
                        <Grid item md={8}>
                          <CardImage src={cardImage} alt="App image" />
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                  <Grid item md={5} xs={11}>
                    <Grid
                      container
                      justify="center"
                      style={{
                        border: `2px solid ${theme.palette.secondary.main}`,
                        padding: theme.spacing(3),
                      }}
                    >
                      <Grid item sm={11} xs={12}>
                        <Box mb="0.5rem">
                          <Typography
                            align="center"
                            variant="h6"
                            color="primary"
                          >
                            <b>Try Your First Postcard Mixtape</b>
                          </Typography>
                        </Box>{' '}
                      </Grid>
                      <Grid item sm={11} xs={12}>
                        <Box height="0.5rem" />
                      </Grid>
                      <Grid item sm={11} xs={12}>
                        <Box mb="0.5rem">
                          <Typography align="center">
                            <b>– Sign up to receive –</b>
                          </Typography>
                        </Box>
                        <Box mb="0.5rem">
                          <Typography>
                            <Emoji symbol="📬" label="handshake" /> A new
                            postcard in the mail every month
                          </Typography>
                        </Box>
                        <Box mb="0.5rem">
                          <Typography>
                            <Emoji symbol="🎧" label="handshake" /> Linked to an
                            exclusive mixtape
                          </Typography>
                        </Box>
                        <Box mb="0.5rem">
                          <Typography>
                            <Emoji symbol="👨‍🎤" label="headphones" />
                            {'  '}Featuring 10+ awesome artists
                          </Typography>
                        </Box>
                        <Box mb="0.5rem">
                          <Typography>
                            <Emoji symbol="🔑" label="handshake" />
                            {'  '}Unlockable only with the Plynth web app
                          </Typography>
                        </Box>
                        <Box mb="0.5rem">
                          <Typography>
                            <Emoji symbol="🖼" label="crystal-ball" />
                            {'  '}Collect and keep forever
                          </Typography>
                        </Box>
                        <Box mb="0.5rem">
                          <Typography>
                            <Emoji symbol="❌" label="cd" />
                            {'  '}Cancel anytime
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item sm={11} xs={12}>
                        <Box height="0.5rem" />
                      </Grid>
                      <Grid item sm={11} xs={12}>
                        <FormControl component="fieldset" margin="normal">
                          <FormLabel component="legend">
                            Choose your subscription:
                          </FormLabel>
                          <Box height="0.5rem" />

                          <RadioGroup
                            aria-label="billing"
                            name="billing1"
                            value={billing}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="annual"
                              control={<Radio color="primary" />}
                              label={
                                <Typography>
                                  <b>$3/month</b>, billed annually ($36 per
                                  year)
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="monthly"
                              control={<Radio color="primary" />}
                              label={
                                <Typography>
                                  <b>$5/month</b>, billed monthly ($60 per year)
                                </Typography>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item sm={11} xs={12}>
                        <Box height="1rem" />
                      </Grid>
                      <Grid item sm={11} xs={12}>
                        <ActionButton
                          style={{
                            paddingRight: '1rem',
                            paddingLeft: '1rem',
                          }}
                          href={paypal[billing].link}
                          label={paypal[billing].label}
                          target="_blank"
                        />
                      </Grid>
                      <Grid item sm={11} xs={12}>
                        <Box height="0.5rem" />
                      </Grid>
                      <Grid item sm={11} xs={10}>
                        <Typography align="center" variant="body2">
                          <i>
                            Pay via Paypal, credit or debit. First payment will
                            be for $0 to authorize card.
                          </i>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Hidden mdUp>
                  <Grid item xs={10}>
                    <CardImage src={cardImage} alt="App image" />
                  </Grid>
                </Hidden> */}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box height={theme.spacing(4)} />
              </Grid>
            </Grid>
          </SectionLight>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default SignUp
