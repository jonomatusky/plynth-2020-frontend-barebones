import React, { useEffect } from 'react'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Hidden,
} from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import styled from 'styled-components'
import * as Yup from 'yup'

import { PieceBox, BarRow } from 'components/CardSections'
import WebsiteNavBar from 'components/WebsiteNavBar'
import { useRequest } from 'hooks/use-request'
import SimpleForm from 'components/SimpleForm'
import appImage from 'images/plynth_matchbook.png'
import { TextField } from 'components/FormElements'
import theme from 'theme'

export const AppImage = styled.img`
  height: 100%;
  max-height: 600px;
  width: 100%;
  object-fit: contain;
  object-position: 50% 50%;
  display: block;
`

export const CardImage = styled(AppImage)`
  width: 75%;
  height: 80%;
  padding: 20% 0;
  transform: rotate(-20deg);
`

const SignUp = () => {
  const { status, request } = useRequest()
  const history = useHistory()
  const location = useLocation()
  const confirmationMessage = `Thanks for signing up! We'll reach out shortly to get you set up.`

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const handleSubmit = async values => {
    try {
      const { link, address, content, name, email } = values

      const messageContent = `${content}<br/><br/>Link: ${link}<br/><br/>${
        address ? `Send a postcard to: ` + address : ''
      }`

      const data = {
        message: { name, email, content: messageContent, type: 'contact' },
      }

      await request({
        url: `/messages`,
        method: 'POST',
        data,
      })
    } catch (err) {}
  }

  const handleClose = () => {
    history.push('/')
  }

  const initialValues = {
    name: '',
    email: '',
    link: '',
    content: '',
    address: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Must be an email address').required('Required'),
    link: Yup.string()
      .url('Please paste in a link to your work')
      .required('Required'),
    content: Yup.string(),
    address: Yup.string(),
  })

  return (
    <>
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
      <Container maxWidth={false}>
        <Grid container justify="space-around">
          <Grid item xs={12}>
            <Box height={theme.spacing(4)} />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h3">
              <b>Try the App</b>
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Grid container justify="space-between">
              <Grid item sm={5} xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Box height="0.5rem" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      We’re opening up the Plynth app to a small group of
                      artists interested in linking their own content. Sign up
                      to try it out.
                    </Typography>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item xs={12}>
                      <AppImage src={appImage} />
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              <Grid item md={5} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Box height="0.5rem" />
                  </Grid>
                  <Grid item xs={12}>
                    <PieceBox container direction="column">
                      <BarRow buttonLabel="Cancel X" />
                      <Grid item>
                        <Grid container justify="center">
                          <Grid item xs={11}>
                            <Box height="1rem"></Box>
                            <SimpleForm
                              onSubmit={handleSubmit}
                              onClose={handleClose}
                              initialValues={initialValues}
                              validationSchema={validationSchema}
                              confirmationMessage={confirmationMessage}
                              status={status}
                            >
                              <Box mb={1}>
                                <TextField name="name" label="Name*" />
                              </Box>
                              <Box mb={1}>
                                <TextField
                                  name="email"
                                  label="Email*"
                                  type="email"
                                />
                              </Box>

                              <Box mb={1}>
                                <TextField
                                  name="link"
                                  label={
                                    <>
                                      Where can we find your work?*
                                      <br /> (Spotify, Bandcamp, Patreon,
                                      website URL)
                                    </>
                                  }
                                  type="url"
                                />
                              </Box>
                              <Box mb={1}>
                                <TextField
                                  name="content"
                                  label="Message (optional)"
                                />
                              </Box>
                              <Box mb={0.75}>
                                <TextField
                                  name="address"
                                  label="Include your address and we'll send your a free Postard Mixtape to try it out in person!"
                                />
                              </Box>
                            </SimpleForm>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Box height="1.5rem" />
                    </PieceBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box height={theme.spacing(6)} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default SignUp
