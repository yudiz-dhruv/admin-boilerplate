import React, { Suspense, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query'
const AllRoutes = React.lazy(() => import('routes'))

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      onSettled: (_d, e) => {
        if (e?.message === 'Network Error') {
          queryClient.invalidateQueries('toast')
          queryClient.setQueryData('message', () => ({ message: e?.message, type: 'error' }))
        }
        if (e?.response?.status > 300) {
          queryClient.invalidateQueries('toast')
          queryClient.setQueryData('message', () => ({
            message: e?.response?.data.message || e?.response?.data || e?.message,
            type: 'error'
          }))
        }
      }
    },
    message: (msg, type) => {
      queryClient.invalidateQueries('toast')
      queryClient.setQueryData('message', () => ({ message: msg, type }))
    }
  },
  mutationCache: new MutationCache({
    onError: (e, query) => {
      if (!query?.disableToast)
        if (e?.message === 'Network Error') {
          queryClient.defaultOptions.message(e?.message, 'error')
        } else if (e?.response?.status === 500) {
          queryClient.defaultOptions.message(e?.message, 'warning')
        } else if (e?.response?.status > 300 && e?.response?.status < 500) {
          queryClient.defaultOptions.message(e?.response?.data.message || e?.message, 'error')
        } else if (e?.response?.status <= 500) {
          queryClient.defaultOptions.message(e?.response?.data.message || e?.message, 'warning')
        }
    }
  })
})

function App() {
  const temp = localStorage.getItem('mode') === 'true'

  useEffect(() => {
    localStorage.setItem('mode', temp)

    document.body.classList.remove(!temp ? 'light' : 'dark')
    document.body.classList.add(temp ? 'light' : 'dark');
  }, [temp])
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={
          <div className='d-flex align-items-center justify-content-center top-0 left-0 position-fixed h-100 w-100'>
            <Spinner animation='border' variant='primary' />
          </div>
        }>
        <AllRoutes />
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
