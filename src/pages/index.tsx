

import { HomeContainer, Product } from "./styles/pages/home"
import camiseta1 from "../pages/assets/1.png"
import camiseta2 from "../pages/assets/2.png"
import camiseta3 from "../pages/assets/3.png"
import Image from "next/image"


export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image  src={camiseta1} alt="" width={520} height={480}/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 69,90</span>
        </footer>
      </Product> 

        <Product>
        <Image  src={camiseta2} alt="" width={520} height={480}/>

        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 69,90</span>
        </footer>
      </Product>  
      
    </HomeContainer>
)}
