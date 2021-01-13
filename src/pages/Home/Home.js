import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Typography,
  Container,
  Box,
  Button,
  Link,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import { HashLink } from 'react-router-hash-link'
import InfoIcon from '@material-ui/icons/Info'

import theme from 'theme'
import { SectionLight, SectionDark } from 'layouts/PageSections'
import { withStyles } from '@material-ui/core/styles'
import PickupButton from 'components/PickupButton'
import appImage from 'images/plynth_matchbook.png'
import cardImage from 'images/postcard_back.png'
import ActionButton from 'components/ActionButton'
import Emoji from 'components/Emoji'
import WebsiteNavBar from 'components/WebsiteNavBar'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'

const StyledBox = styled(Box)`
  background-color: ${theme.palette.background.default};
  background-image: linear-gradient(
    0deg,
    ${theme.palette.primary.main}70,
    ${theme.palette.primary.main}00
  );
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
`

const AppImage = styled.img`
  height: 100%;
  max-height: 600px;
  width: 100%;
  object-fit: contain;
  object-position: 50% 50%;
  display: block;
`

const CardImage = styled(AppImage)`
  width: 75%;
  height: 80%;
  padding: 20% 0;
  transform: rotate(-20deg);
`

const StyledTooltip = withStyles(theme => ({
  tooltipPlacementTop: {
    margin: '0',
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    maxWidth: 220,
  },
}))(Tooltip)

const StyledInfo = styled(InfoIcon)`
  opacity: 0.4;
  &:hover {
    opacity: 0.6;
  }
`

const SmoothHashLink = React.forwardRef((props, ref) => (
  <HashLink smooth innerRef={ref} {...props} />
))

const Home = () => {
  let vh = window.innerHeight * 0.01

  document.documentElement.style.setProperty('--vh', `${vh}px`)

  return (
    <>
      <ScrollToTopOnMount />
      <Container disableGutters maxWidth={false}>
        <StyledBox>
          <Grid
            container
            direction="column"
            align="center"
            justify="space-between"
            wrap="nowrap"
            style={{ height: '100%' }}
          >
            <Grid item>
              <WebsiteNavBar
                position="static"
                opacity="0.4"
                left={
                  <Grid item xs={1}>
                    <Grid container justify="flex-start">
                      <Grid item>
                        <StyledTooltip
                          title={
                            <>
                              <Typography color="inherit">
                                Welcome to Plynth. It's like a QR code, without
                                the QR code.
                              </Typography>
                              <br />
                              <Typography color="inherit">
                                Give it a try:
                              </Typography>
                              <Typography color="inherit">
                                1. Upload a photo of a piece of art
                              </Typography>
                              <Typography color="inherit">
                                2. Access the content it's linked to!
                              </Typography>
                            </>
                          }
                          enterTouchDelay={0}
                          leaveTouchDelay={10000}
                          interactive={true}
                          arrow={true}
                          placement="bottom-start"
                        >
                          <IconButton aria-label="info">
                            <StyledInfo />
                          </IconButton>
                        </StyledTooltip>
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
                          to="/admin/login"
                          style={{ textTransform: 'none' }}
                        >
                          <p style={{ opacity: 0.7 }}>Sign In</p>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                }
              />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <PickupButton />
                </Grid>
                <Box height="1rem"></Box>
                <Grid item>
                  <Typography variant="h6">
                    Take a photo to access your content
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                component={SmoothHashLink}
                to="#about"
                style={{ textTransform: 'none' }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h6" style={{ opacity: 0.8 }}>
                      Learn More
                    </Typography>
                  </Grid>
                  <Grid item style={{ lineHeight: 1 }}>
                    <ExpandMoreIcon style={{ padding: 0, opacity: 0.8 }} />
                  </Grid>
                </Grid>
              </Button>
            </Grid>
          </Grid>
        </StyledBox>
      </Container>

      <Container disableGutters maxWidth={false}>
        <SectionLight id="about">
          <Grid container justify="center">
            <Grid item xs={8}>
              <Grid container direction="column" align="center">
                <Box height="5rem" />
                <Grid item>
                  <Box mb={2}>
                    <Typography variant="h3">
                      <b>
                        Bring Your Art to Life{' '}
                        <Emoji symbol="✨" label="sparkle" />
                      </b>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography>
                    {`Use Plynth to link physical artwork to digital content. Fans, friends and customers snap a photo to
                    start exploring–no QR code required.`}
                  </Typography>
                </Grid>
                <Box height="4rem" />
                <Grid item>
                  <Grid container justify="space-around">
                    {/* For Fans Banner */}
                    <Grid item md={4} xs={8}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="h4">
                            <Emoji symbol="🙋‍♀️" label="fan" />
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Box mb={1}>
                            <Typography variant="h4">
                              <b>For Fans</b>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box mb={1}>
                            <Typography>{`A whole new way to discover music. Get a Postcard Mixtape delivered every month.`}</Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Typography>
                            <Link
                              component={SmoothHashLink}
                              to="#for-fans"
                              color="primary"
                            >
                              Learn More
                            </Link>
                          </Typography>
                        </Grid>
                        <Box height="3rem" />
                      </Grid>
                    </Grid>
                    {/* For Creators Banner */}
                    <Grid item md={4} xs={8}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="h4">
                            <Emoji symbol="👨‍🎤" label="musician" />
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Box mb={1}>
                            <Typography variant="h4">
                              <b>For Creators</b>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box mb={1}>
                            <Typography>
                              Use Plynth to link your art, merch and marketing
                              materials to digital experiences.
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box style={{ opacity: '80%' }}>
                            <Typography>
                              <Link
                                component={SmoothHashLink}
                                to="#for-creators"
                                color="primary"
                              >
                                Learn More
                              </Link>
                            </Typography>
                          </Box>
                        </Grid>
                        <Box height="3rem" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Box height="4rem" />
              </Grid>
            </Grid>
          </Grid>
        </SectionLight>

        {/* For Fans */}
        <SectionDark id="for-fans">
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={10}>
              <Box height="3rem" />
              <Grid
                container
                justify="space-around"
                alignItems="center"
                alignContent="center"
              >
                <Grid item xs={8} sm={6}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                  >
                    <CardImage src={cardImage} alt="App image" />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Box color={theme.palette.primary.main}>
                        <Typography variant="h3">
                          <b>For Fans</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">
                        <b>New Music, Delivered</b>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Every month, we partner with 10+ musicians to produce a
                        new <b>Postcard Mixtape</b> and deliver it directly to
                        your door. Just snap a photo to unlock a secret, curated
                        playlist and info about the artists.
                      </Typography>
                    </Grid>
                    <Grid item md={8}>
                      <Box mb={1}>
                        <Typography>
                          <b>
                            Try it out now and get a free bonus postcard to send
                            to a friend every month.
                          </b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <ActionButton
                        component={RouterLink}
                        to="/s/signup/postcard-mixtape"
                        label="Sign Up"
                        fullWidth={false}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box height="3rem" />
            </Grid>
          </Grid>
        </SectionDark>
        {/* For Artists */}
        <SectionLight id="for-creators">
          <Grid container justify="center">
            <Grid item xs={10}>
              <Box height="4rem" />
              <Grid container justify="space-around">
                <Grid item xs={12} sm={6}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Box color={theme.palette.primary.main}>
                        <Typography variant="h3">
                          <b>For Artists</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">
                        <b>Your Art, Powered by Plynth</b>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box mb="1em">
                        <Typography>
                          Turn your merch into a virtual mixtape. Upload a
                          photo, add your links and you’re ready to go. Fans
                          just snap a pic to access your art and learn more
                          about you. No download required.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box mb="1em">
                        <Typography variant="h6">
                          <Emoji symbol="🤝" label="handshake" /> Connect with
                          your fans
                        </Typography>
                      </Box>
                      <Box mb="1em">
                        <Typography variant="h6">
                          <Emoji symbol="🔮" label="crystal-ball" /> Add meaning
                          to your merch
                        </Typography>
                      </Box>
                      <Box mb="1em">
                        <Typography variant="h6">
                          <Emoji symbol="🎧" label="headphones" /> Promote your
                          work
                        </Typography>
                      </Box>
                      <Box mb="1em">
                        <Typography variant="h6">
                          <Emoji symbol="💿" label="cd" /> Make anything a
                          mixtape
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box mb="1em">
                        <Typography>
                          <b>
                            Now open to artists participating in our private
                            beta. Sign up try it out.
                          </b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <ActionButton
                        component={RouterLink}
                        to="/s/signup/creators"
                        label="Try the App"
                        fullWidth={false}
                      />
                    </Grid>
                    <Box height="2rem" />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <AppImage src={appImage} alt="App image" />
                </Grid>
              </Grid>
              <Box height="4rem" />
            </Grid>
          </Grid>
        </SectionLight>
        <SectionDark>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Box height="5rem" />
            <Grid item>
              <Typography variant="h5">Questions?</Typography>
            </Grid>
            <Grid item>
              <Button component={RouterLink} to="/s/contact">
                <Typography variant="h6" style={{ textTransform: 'none' }}>
                  Get in Touch
                </Typography>
              </Button>
            </Grid>
            <Box height="5rem" />
          </Grid>
        </SectionDark>
        <SectionDark>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item>
              <Box height="1rem" />
              <Typography variant="body2">Copyright © 2020 Plynth</Typography>
              <Box height="1rem" />
            </Grid>
          </Grid>
        </SectionDark>
      </Container>
    </>
  )
}

export default Home
