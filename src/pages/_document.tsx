import { Html, Head, Main, NextScript } from 'next/document'

/**
 * This file is only used to override the default Next.js _document.tsx in order to add custom fonts
 */
export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
