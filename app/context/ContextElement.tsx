import React,{ReactNode} from 'react'
import { AuthProvider } from './auth/AuthProvider'
import { UiProvider } from './ui/UiProvider'

export const ContextElement = ({children}:{children:ReactNode}) => {
  return (
    <AuthProvider>
      <UiProvider>
        <>{children}</>
      </UiProvider>
    </AuthProvider>
  )
}
