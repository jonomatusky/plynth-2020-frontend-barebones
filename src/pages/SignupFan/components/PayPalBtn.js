import { PayPalButton } from 'react-paypal-button-v2'
import React from 'react'
export function PayPalBtn(props) {
  const { REACT_APP_PAYPAL_CLIENT_ID } = process.env

  const paypalKey = 'P-33Y03752RE9200540L7CYTQI'

  return (
    <PayPalButton
      options={{
        clientId: REACT_APP_PAYPAL_CLIENT_ID,
        vault: true,
        intent: 'subscription',
      }}
      createSubscription={(data, actions) => {
        return actions.subscription.create({
          plan_id: paypalKey,
        })
      }}
      onApprove={(data, actions) => {
        // Capture the funds from the transaction
        return actions.subscription.get().then(function (details) {
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
  )
}
export default PayPalBtn
