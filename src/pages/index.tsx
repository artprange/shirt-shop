

import { HomeContainer, Product } from "./styles/pages/home"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import camiseta1 from "../pages/assets/1.png"
import camiseta2 from "../pages/assets/2.png"
import camiseta3 from "../pages/assets/3.png"
import Image from "next/image"




export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides:{
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider" >
      <Product className="keen-slider__slide" >
        <Image  src={camiseta1} alt="" width={520} height={480}/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 69,90</span>
        </footer>
      </Product  > 

      <Product className="keen-slider__slide">
        <Image  src={camiseta2} alt="" width={520} height={480}/>

        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 69,90</span>
        </footer>
      </Product>  
      <Product className="keen-slider__slide" >
        <Image  src={camiseta3} alt="" width={520} height={480}/>

        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 69,90</span>
        </footer>
      </Product>  
      
    </HomeContainer>
)}
