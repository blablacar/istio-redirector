import Head from 'next/head'
import Nav from '../components/Nav'

export default function Layout({
    children,
    title = 'istio-redirector',
}) {

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header>
                <Nav />
            </header>
            {children}
        </div>
    )
}
