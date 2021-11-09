import React from 'react'
import { SWRConfig } from 'swr'
import { useToast } from '@chakra-ui/toast'

import apiService from './apiService'

function SWRProvider({ children }) {
  const toast = useToast()

  return (
    <SWRConfig
      value={{
        fetcher: apiService.get,
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
