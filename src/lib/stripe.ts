// import Stripe from 'stripe'




// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2023-10-16',
//     appInfo: {
//         name: 'Shirt Shop', 
//     }

// })


import Stripe from 'stripe';

// Check if the environment variable is defined
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined');
}

// Now you can safely use it
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Shirt Shop',
  },
});
