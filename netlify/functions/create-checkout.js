const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' })
      };
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Hook Analyzer Pro',
              description: 'Unlimited YouTube channel analysis and advanced insights'
            },
            unit_amount: 2900, // $29.00
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.URL || 'http://localhost:3000'}?upgrade=success`,
      cancel_url: `${process.env.URL || 'http://localhost:3000'}?upgrade=cancelled`,
      metadata: {
        customer_email: email
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ url: session.url })
    };

  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error.message 
      })
    };
  }
};