import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";




export default async function handler(req: NextApiRequest, res: NextApiResponse){

     const prices = await stripe.prices.list();
     const priceId = prices.data[0].id;

  

    if(req.method !== 'POST'){
        return res.status(405).json({ error: 'Method not allowed, please use POST' });
    }

    if (!priceId){
        return res.status(400).json({ error: 'No price found' });
    }
    

    const baseUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/success`;
    const cancelUrl = `${baseUrl}/cancel`;
    
    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
    });

return res.status(201).json({
     checkoutUrl: checkoutSession.url
     })
}