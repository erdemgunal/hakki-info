import Head from 'next/head'

export default function MetaTags() {
  return (
    <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta httpEquiv='Content-Language' content='en' />{' '}
        <link rel='icon' href='/favicon.ico' />
        <meta name='site_name' content="Hakkı's Portfolio" />
        <meta
            key='description'
            name='description'
            content="Personal portfolio of Hakki Erdem Gunal, showcasing skills in various programming languages, a collection of software development projects, and contact information. Explore to learn more about Hakki's experience and work."
        />
        <meta property='og:type' content='website' />
        <meta
            property='og:title'
            name='og:title'
            content="Hakkı's Portfolio"
        />
        <meta
            property='og:description'
            name='og:description'
            content="Personal portfolio of Hakki Erdem Gunal, showcasing skills in various programming languages, a collection of software development projects, and contact information. Explore to learn more about Hakki's experience and work."
        />
        <meta property='og:url' name='og:url' content="https://hakki.info" />
        <link rel='canonical' href="https://hakki.info" />
        <meta property='og:site_name' content="Hakkı's Portfolio" />
        <meta property='og:locale' content='en' />
        <meta name='twitter:card' content='summary' />
    </Head>
  )
}