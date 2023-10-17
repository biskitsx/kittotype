import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>Kitto Type</title>
                {/* <link rel='icon' href='./kb1=2.png' sizes='any' /> */}
                <link rel='icon' href='./kb.webp' sizes='any' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
