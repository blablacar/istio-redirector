import Head from 'next/head'
import Nav from '../components/Nav'
import { LayoutContext } from '../context/layout-context'
import { useGetLayout } from '../utils/hooks/getLayout'
import Alert from './Alert'

export default function Layout({
    children,
    title = 'Istio Redirector',
}) {

    const getLayout = useGetLayout()

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
            <LayoutContext.Provider value={getLayout}>
                <Alert/>
                {children}
            </LayoutContext.Provider>
        </div>
    )
}
