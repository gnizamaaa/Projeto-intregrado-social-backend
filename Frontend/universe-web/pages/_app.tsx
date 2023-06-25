import Layout from '@/components/Layout'
import LoginModal from '@/components/LoginModal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function App({ Component, pageProps }: AppProps) {


  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>)
}