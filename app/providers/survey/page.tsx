import { Metadata } from 'next'
import React from 'react'
import SurveryPage from './components/SurveryPage'
export const metadata: Metadata = {
  title: 'IMAPR | Encuesta',
  description: 'INGENIERÍA MECÁNICA APLICADA DE POZA RICA S.A. DE C.V.',
}

const Survey = () => <SurveryPage/>

export default Survey