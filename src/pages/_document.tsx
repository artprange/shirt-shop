import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../styles'

export default function Document() {
  return (
    <Html lang="en">

      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

      <style id="stitches" dangerouslySetInnerHTML={{__html: getCssText}}/>
      </Head> 
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
