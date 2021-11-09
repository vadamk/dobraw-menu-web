import React from 'react'
import { SWRConfig } from 'swr'
import { useToast } from '@chakra-ui/toast'

import apiService from './apiService'

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  // We still use the map for write & read for performance.
  return map
}

function SWRProvider({ children }) {
  const toast = useToast()

  return (
    <SWRConfig
      value={{
        fetcher: apiService.get,
        provider: localStorageProvider,
        revalidateOnFocus: false,
        onError: (error) => {
          console.log(error)
          toast(error.message, { appearance: 'error' })
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
