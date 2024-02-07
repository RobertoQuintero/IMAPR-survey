import React from 'react'
import SurveyEntriesPage from './components/SurveyEntriesPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IMAPR | Encuesta',
  description: 'INGENIERÍA MECÁNICA APLICADA DE POZA RICA S.A. DE C.V.',
}

const SurveyEntries = () => <SurveyEntriesPage/>

export default SurveyEntries