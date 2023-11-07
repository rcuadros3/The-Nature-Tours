/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51O7Ma2ELKax9i6qsPvviHiYFKQlkMCiNwRBr7nNrNZ0XuEst4cHT2YNtIqW76Ev7y15j4kPBAAC6RgSBhwkeTKKg00Z6dNEZsC');

export const bookTour = async tourId => {
  try {
    // 1. Get checkout session from API
    const session = await axios.get(`http://127.0.0.1:2222/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2. Create checkout form + change credit card
    const stripe = await stripePromise; // Carga la biblioteca de Stripe
    debugger
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });

    if (error) {
      // Handle any errors that occurred.
      showAlert('error', error.message);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
