'use client'
import React from 'react'
import { Providers } from './core/redux/provider'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import './globals.css'

interface Props {
  children: React.ReactNode
}

export default function App ({ children }: Props): React.ReactElement {
  return (
    <>
      <Providers>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          icon={false}
          limit={3}
          transition={Slide}
        />
        {children}
      </Providers>
    </>
  )
}
