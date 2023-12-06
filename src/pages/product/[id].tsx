


import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { stripe } from '../../lib/stripe';
import Stripe from 'stripe';
import Image from 'next/image';

// interface ProductProps {
//   product: {
//     id: string;
//     name: string;
//     imageUrl: string;
//     price: string;
//     description: string;
//   };
// }

// export default function Product({ product }: ProductProps) {
//   return (
//     <ProductContainer>
//       <ImageContainer>
//         <ImageContainer>
//           <Image src={product.imageUrl} width={520} height={480} alt="" />
//         </ImageContainer>
//         <ProductDetails>
//           <h1>{product.name}</h1>
//           <span>{product.price}</span>
//           <p>{product.description}</p>
//           <button>Comprar agora</button>
//         </ProductDetails>
//       </ImageContainer>
//     </ProductContainer>
//   );
// }


// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { id: '' } }
//     ],
//      fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
//   if (!params) {
 
//     return {
//       props: {
//         product: {},
//       },
//       revalidate: 60 * 60 * 1, // 1 hour
//     };
//   }

//   const productId = params.id;

//   const product = await stripe.products.retrieve(productId, {
//     expand: ['default_price'],
//   });

//   const price = product.default_price as Stripe.Price;

//   let calculatedPrice = null;
//   if (price.unit_amount !== null) {
//     calculatedPrice = new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//     }).format(price.unit_amount / 100);
//   }

//   return {
//     props: {
//       product: {
//         id: product.id,
//         name: product.name,
//         imageUrl: product.images[0],
//         price: calculatedPrice,
//         description: product.description,
//         defaultPriceId: price.id,
//       },
//     },
//     revalidate: 60 * 60 * 1, // 1 hour
//   };
// };

interface ProductProps {
  product: {
      id: string;
      name: string;
      imageUrl: string;
      price: string;
      description: string;
    }
}

export default function Product({ product }: ProductProps) {
 

  return (
      <ProductContainer>
          <ImageContainer>
              <Image src={product.imageUrl} width={520} height={480} alt="product"/>
          </ImageContainer>
          <ProductDetails>
              <h1>{product.name}</h1>
              <span>{product.price}</span>

              <p>{product.description}</p>

              <button>Comprar Agora</button>
          </ProductDetails>

      </ProductContainer>

  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
      paths: [
          { params: { id: 'prod_P5PgZd8YWdKzi3' }}
      ],
      fallback: 'blocking',
  }
}
  
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id;

  if (!productId) {
    // Handle the case where productId is null or undefined
    return {
      notFound: true,
    };
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  if (!price || price.unit_amount === null) {
    // Handle the case where price or price.unit_amount is null
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images?.[0] || '', // Use optional chaining here as well
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description || '',
      },
    },
    revalidate: 60 * 60 * 1,
  };
};