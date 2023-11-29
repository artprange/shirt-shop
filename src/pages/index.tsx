

import { HomeContainer, Product } from "./styles/pages/home"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import camiseta1 from "../pages/assets/1.png"
import camiseta2 from "../pages/assets/2.png"
import camiseta3 from "../pages/assets/3.png"
import Image from "next/image"
import { stripe } from '../lib/stripe';
import { GetServerSideProps } from "next"
import Stripe from "stripe"

require('dotenv').config({ path: '.env.local' });


interface HomeProps{
  products:{
    id: string;
    name: string;
    imageUrl:string;
    price: number;
  }[]
}

export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides:{
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider" >
     {products.map(product=>{
      return(
        <Product key={product.id} className="keen-slider__slide" >
        <Image  src={camiseta1} alt="" width={520} height={480}/>

        <footer>
          <strong>{product.name}</strong>
          <span>R${product.price}</span>
        </footer>
      </Product  > 
      )
     })}


      

      
      
    </HomeContainer>
)}



export const getServerSideProps: GetServerSideProps  = async() =>{
 const  response = await stripe.products.list(
  {
    expand:['data.default_price']
  }
 )
 const products = response.data.map(product =>{
  const price = product.default_price as Stripe.Price
  return {
    id: product.id,
    name: product.name,
    iamgeUrl: product.images[0],
    price: price.unit_amount,
  }
 })
  console.log(response.data)
  
  return{
    props:{
      products
    }
  }
}