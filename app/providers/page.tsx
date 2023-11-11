import React from 'react'
import ProvidersPage from './components/ProvidersPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IMAPR | Proveedores',
  description: 'INGENIERÍA MECÁNICA APLICADA DE POZA RICA S.A. DE C.V.',
}

const Providers = () => <ProvidersPage/>

export default Providers