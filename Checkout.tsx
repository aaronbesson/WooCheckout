import React from 'react';
import { View, Text } from 'react-native';
import StripeCheckout from 'react-native-stripe-checkout';

const App = () => {
  const handleToken = (token) => {
    // Send the token to your server
    fetch('http://your-server.com/charge', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        // Push the order details to the WooCommerce REST API
        fetch('http://your-woocommerce-site.com/wp-json/wc/v3/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'),
          },
          body: JSON.stringify({
            payment_method: 'stripe',
            payment_method_title: 'Stripe',
            set_paid: true,
            billing: {
              first_name: token.card.name,
              address_1: token.card.address_line1,
              address_2: token.card.address_line2,
              city: token.card.address_city,
              state: token.card.address_state,
              postcode: token.card.address_zip,
              country: token.card.address_country,
              email: token.email,
              phone: token.card.phone,
            },
            shipping: {
              first_name: token.card.name,
              address_1: token.card.address_line1,
              address_2: token.card.address_line2,
              city: token.card.address_city,
              state: token.card.address_state,
              postcode: token.card.address_zip,
              country: token.card.address_country,
            },
            line_items: [
              {
                product_id: 123,
                name: 'Jordan One',
                quantity: 1,
                price: 100,
              },
            ],
            shipping_lines: [
              {
                method_id: 'fedex',
                method_title: 'Fedex',
                total: 10,
              },
            ],
          }),
        }).then(response => {
          // Handle the response from the WooCommerce API
          // You can use the response to display a confirmation message to the user, etc.
          console.log(response);
        });
      });
    });
  };

  return (
    <View>
      <Text>Hello World!</Text>
      <StripeCheckout
        publishableKey="pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
        amount={1000}
        currency="USD"
        token={handleToken}
      />
    </View>
  );
};

export default App;
