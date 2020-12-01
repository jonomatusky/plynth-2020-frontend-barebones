import React from 'react'
import { Container, Grid, Typography, Box } from '@material-ui/core'
import styled from 'styled-components'
import { PayPalButton } from 'react-paypal-button-v2'

import { useAuth } from 'hooks/auth-hook'
import { PieceBox } from 'components/CardSections'

import appImage from 'images/plynth_matchbook.png'

import { SectionLight } from 'layouts/PageSections'
// import PayPalBtn from './components/PayPalBtn'

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

const { REACT_APP_PAYPAL_CLIENT_ID } = process.env

console.log(REACT_APP_PAYPAL_CLIENT_ID)

const SignUp = () => {
  const auth = useAuth()

  // const handleClose = () => {
  //   history.push('/')
  // }

  // const paypalSubscribe = (data, actions) => {
  //   return actions.subscription.create({
  //     plan_id: '<plan-id>',
  //   })
  // }

  // const paypalOnError = err => {
  //   console.log('Error')
  // }

  // const paypalOnApprove = (data, detail) => {
  //   // call the backend api to store transaction details
  //   console.log('Payapl approved')
  //   console.log(data.subscriptionID)
  // }

  return (
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
                  <Grid item xs={10}>
                    <Typography variant="h3" align="center">
                      <b>Get a Postacard Mixtape</b>
                    </Typography>
                    <Box mb={2}></Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Grid item xs={8}>
                    <Typography align="center">
                      A whole new way to discover music. Get a new postcard
                      delivered to your door every month. Use the Plynth app to
                      unlock an exclusive mixtape featuring tracks from 10+
                      amazing artists. Collect and keep 'em forever.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Grid item xs={8}>
                    <Typography align="center">
                      We're currently offering our Postcard mixtapes starting
                      January 2021. Sign up now to get a FREE holiday postcard
                      from the Plynth team. Your credit card won't be charged
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="space-around">
                  <Grid item>
                    <Grid item>
                      <PieceBox container direction="column">
                        <Grid item>
                          <Grid container justify="center">
                            <Grid item xs={11}>
                              <Box height="1rem"></Box>
                              {auth.authStatus !== 'loading' && (
                                <PayPalButton
                                  options={{
                                    clientId: REACT_APP_PAYPAL_CLIENT_ID,
                                    vault: true,
                                    intent: 'subscription',
                                  }}
                                  createSubscription={(data, actions) => {
                                    return actions.subscription.create({
                                      plan_id: 'P-33Y03752RE9200540L7CYTQI',
                                    })
                                  }}
                                  onApprove={(data, actions) => {
                                    // Capture the funds from the transaction
                                    return actions.subscription
                                      .get()
                                      .then(function (details) {
                                        // Show a success message to your buyer
                                        alert('Subscription completed')

                                        // OPTIONAL: Call your server to save the subscription
                                        // return fetch('/paypal-subscription-complete', {
                                        //   method: 'post',
                                        //   body: JSON.stringify({
                                        //     orderID: data.orderID,
                                        //     subscriptionID: data.subscriptionID,
                                        //   }),
                                        // })
                                      })
                                  }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Box height="2rem"></Box>
                      </PieceBox>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <Grid container direction="column" spacing={3}>
                          <Grid item>
                            <PieceBox container direction="column">
                              <Grid item>
                                <Grid container justify="center">
                                  <Grid item xs={11}>
                                    <Box height="1rem"></Box>
                                    {/* {auth.authStatus !== 'loading' && (
                                      <PayPalButton
                                        options={{
                                          clientId: REACT_APP_PAYPAL_CLIENT_ID,
                                          vault: true,
                                          intent: 'subscription',
                                        }}
                                        createSubscription={(data, actions) => {
                                          return actions.subscription.create({
                                            plan_id:
                                              'P-33Y03752RE9200540L7CYTQI',
                                          })
                                        }}
                                        onApprove={(data, actions) => {
                                          // Capture the funds from the transaction
                                          return actions.subscription
                                            .get()
                                            .then(function (details) {
                                              // Show a success message to your buyer
                                              alert('Subscription completed')

                                              // OPTIONAL: Call your server to save the subscription
                                              // return fetch('/paypal-subscription-complete', {
                                              //   method: 'post',
                                              //   body: JSON.stringify({
                                              //     orderID: data.orderID,
                                              //     subscriptionID: data.subscriptionID,
                                              //   }),
                                              // })
                                            })
                                        }}
                                      />
                                    )} */}
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Box height="2rem"></Box>
                            </PieceBox>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SectionLight>
    </Container>
  )
}

export default SignUp
