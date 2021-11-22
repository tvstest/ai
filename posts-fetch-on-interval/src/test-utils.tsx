/* eslint-disable import/no-unresolved */
import React, { Suspense } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import Loader from 'app/components/Loader'
import Navbar from 'app/components/Navbar'
import PostsData from 'app/components/PostsData'
import { theme } from 'app/app.theme'
import 'react-toastify/dist/ReactToastify.css'
import 'app/App.css'

const AppComponent: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Navbar />
        <PostsData />
        <Loader />
      </ThemeProvider>
    </Suspense>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult => render(ui, { wrapper: AppComponent, ...options })

export * from '@testing-library/react'
export { customRender as render }
