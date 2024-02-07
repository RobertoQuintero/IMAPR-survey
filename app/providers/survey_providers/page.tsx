import { Metadata } from 'next'
import React from 'react'
import SurveyProvidersPage from './components/SurveyProvidersPage'

export const metadata: Metadata = {
  title: 'IMAPR | Proveedores - Encuesta',
  description: 'INGENIERÍA MECÁNICA APLICADA DE POZA RICA S.A. DE C.V.',
}

const SurveyProviders = () => <SurveyProvidersPage/>

export default SurveyProviders