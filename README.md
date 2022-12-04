# WooCheckout

This code is a simple example of integrating the Stripe payment gateway with a React Native application. When the user clicks on the StripeCheckout component, it opens a Stripe payment form where the user can enter their payment details. When the user completes the form and submits the payment, Stripe sends a payment token to the handleToken function. The handleToken function sends this payment token to your server, where you can charge the user's card using the Stripe API. Once the payment is processed, the handleToken function sends the order details to the WooCommerce REST API to create a new order. Finally, it logs the response from the WooCommerce API to the console.