// import Stripe from 'stripe'




// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2023-10-16',
//     appInfo: {
//         name: 'Shirt Shop', 
//     }

// })


import Stripe from 'stripe';

//checking the enviroment exists
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined');
}

// using the secure key safely :)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Shirt Shop',
  },
});
