
import { ImageContainer, ProductContainer, ProductDetails } from '../product'
import { GetStaticProps } from 'next';
import {stripe} from "../../lib/stripe"
import Stripe from 'stripe';
import Image from 'next/image';



interface ProductProps{
    product:{
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string
    }
}


export  function Product({product}: ProductProps){



    return(
       <ProductContainer>
        <ImageContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=''/>

            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>
                <button>
                    Comprar agora
                </button>
            </ProductDetails>
        </ImageContainer>
        </ProductContainer>
    )

}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params?.id; 

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    const formattedPrice =
      price.unit_amount !== null
        ? new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price.unit_amount / 100)
        : 'N/A'; 



    return {
      props: {
        product:{
            id:product.id,
            name:product.name,
            imageUrl: product.images[0],
            price: formattedPrice,
            description: product.description
        }
      },
      revalidate: 60 * 60, // Fixed the revalidate value
    };
  };
  
