import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Typography, Box } from '@material-ui/core'
import styled from 'styled-components'
import * as Yup from 'yup'

import { PieceBox, BarRow, BottomRow } from 'components/CardSections'
import { useRequest } from 'hooks/use-request'
import FormLayout from 'layouts/FormLayout'
import SimpleForm from 'components/SimpleForm'
import appImage from 'images/plynth_matchbook.png'
import { TextField, TextArea } from 'components/FormElements'
import { SectionLight } from 'layouts/PageSections'

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

  const confirmationMessage = `Thanks for signing up! We'll reach out shortly to get you set up.`

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
      <Container disableGutters maxWidth={false}>
        <SectionLight>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
              >
                <Box height="3rem" />
                <Grid item>
                  <Grid container justify="center">
                    <Grid xs={10}>
                      <Typography variant="h3" align="center">
                        <b>Get a Postacard Mixtape</b>
                      </Typography>
                      <Box mb={2}></Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="center">
                    <Grid xs={8}>
                      <Typography align="center">
                        A whole new way to discover music. Get a new postcard
                        delivered to your door every month. Use the Plynth app
                        to unlock an exclusive mixtape featuring tracks from 10+
                        amazing artists. Collect and keep 'em forever.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="center">
                    <Grid xs={8}>
                      <Typography align="center">
                        We're currently offering our Postcard mixtapes starting
                        January 2021. Sign up now to get a FREE holiday postcard
                        from the Plynth team.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item></Grid>
                <Grid item>
                  <Grid container justify="space-around">
                    <Grid item md={1} sm={0}></Grid>
                    <Grid item md={4} sm={7} xs={11}>
                      <Grid container>
                        <Grid item>
                          <Grid container direction="column" spacing={3}>
                            <Grid item>
                              {/* <Box color={theme.palette.primary.main}> */}

                              {/* </Box> */}
                            </Grid>
                            <Grid item>
                              <Typography>
                                We’re opening up the Plynth app to a small group
                                of beta users. Sign up below to try it out.
                              </Typography>
                            </Grid>
                            <Grid item>
                              <PieceBox container direction="column">
                                <Grid item>
                                  <Grid container justify="center">
                                    <Grid item xs={11}>
                                      <Box height="1rem"></Box>
                                      <SimpleForm
                                        onSubmit={handleSubmit}
                                        onClose={handleClose}
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        confirmationMessage={
                                          confirmationMessage
                                        }
                                        status={status}
                                      >
                                        <Box mb={1}>
                                          <TextField
                                            name="name"
                                            label="Name*"
                                          />
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
                                                <br /> (Spotify, Bandcamp,
                                                Patreon, website URL)
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
                                        <Box mb={1}>
                                          <TextField
                                            name="address"
                                            label="Include your address and we'll send your a free Postard Mixtape to try it out in person!"
                                          />
                                        </Box>
                                      </SimpleForm>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Box height="2rem"></Box>
                                {/* <BottomRow container justify="center">
                        {bottom}
                      </BottomRow> */}
                              </PieceBox>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={1} sm={0}></Grid>
                    <Grid item md={5} sm={12}>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        style={{ height: '100%' }}
                      >
                        <AppImage src={appImage} />
                      </Grid>
                    </Grid>
                    <Grid item md={1} sm={0}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SectionLight>
      </Container>
    </>
  )
}

export default SignUp
