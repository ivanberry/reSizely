import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout'
import NextNProgress from 'nextjs-progressbar'
import { SWRConfig } from 'swr'
import request from '../lib/request'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { createContext, useEffect, useState } from 'react'
import { ICategory, INIT } from '../type.d.ts'

export const CategoryContext = createContext([INIT])

async function getCategoryConfig() {
  const { data } = await request('/category')
  return data
}

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const [categoryList, setCategoryList] = useState<ICategory[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = (await getCategoryConfig()) as ICategory[]
      setCategoryList(response)
    }
    fetchData()
  }, [])

  return (
    <CategoryContext.Provider value={categoryList}>
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
    </CategoryContext.Provider>
  )
}

export default MyApp
