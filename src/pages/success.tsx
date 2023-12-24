 import { SuccessContainer, ImageContainer } from "@/styles/pages/success"
import Link from "next/link"



 
 function Success(){
    return(
        <SuccessContainer>
        <h1>Conmpra efetuada!</h1>

        <ImageContainer>


        </ImageContainer>

        <p><strong>Usuário</strong>, seu <strong>produto</strong> já está a caminho da sua casa!</p>

        <Link href="/">
        Volar ao catalogo
        
        </Link>

        </SuccessContainer>
    )
}

export default Success