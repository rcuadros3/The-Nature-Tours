/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51O7Ma2ELKax9i6qsPvviHiYFKQlkMCiNwRBr7nNrNZ0XuEst4cHT2YNtIqW76Ev7y15j4kPBAAC6RgSBhwkeTKKg00Z6dNEZsC');

export const bookTour = async tourId => {
  try {
    // 1. Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:2222/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2. Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
