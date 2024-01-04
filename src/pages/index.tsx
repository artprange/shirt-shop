
import Head from 'next/head'
import { HomeContainer, Product } from "../styles/pages/home"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import camiseta1 from "../assets/1.png"
import camiseta2 from "../assets/2.png"
import camiseta3 from "../assets/3.png"
import Image from "next/image"
import { stripe } from '../lib/stripe';
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"

require('dotenv').config({ path: '.env.local' });

interface HomeProps{
  products:{
    id: string;
    name: string;
    imageUrl:string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (

    <>
    <Head>
      <title>Home | Ignite Shop</title>
    </Head>

    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
           <Product key={product.id} className="keen-slider__slide"> 
       
            <Image src={product.imageUrl} alt={product.name} width={520} height={480} />

            <footer>
              <strong>{product.name}</strong>
              <span>R${product.price}</span>
            </footer>
          </Product>
          </Link>
        );
      })}
    </HomeContainer>
    </>
  );
}



export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

   
    const formattedPrice =
      price.unit_amount !== null
        ? new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price.unit_amount / 100)
        : 'N/A'; 

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formattedPrice,
    };
  });

  // console.log(response.data)

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
