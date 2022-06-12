import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout'
import NextNProgress from 'nextjs-progressbar'
import { SWRConfig } from 'swr'
import request from '../lib/request'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <NextNProgress />
      <SWRConfig
        value={{
          // @ts-ignore
          fetcher: (...args) => request(...args),
        }}
      >
        <ToastContainer draggable={false} hideProgressBar={true} limit={2} />
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  )
}

export default MyApp
