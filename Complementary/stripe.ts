const Stripe  = require('stripe');
export const stripe = Stripe(process.env.STRIPE_TEST_KEY);