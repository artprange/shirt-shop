

import type { AppProps } from 'next/app'
import { globalStyles } from './styles/global'
import logoImg from '@/pages/assets/logo.svg'


globalStyles();

export default function App({ Component, pageProps }: AppProps) {



  return (
    <div>
      <header>
        <img src={logoImg.src} alt=""/>

      </header>
      <Component {...pageProps} />

    </div>
  )
}
