import { Metadata } from 'next'
import React from 'react'
import SurveryNewPage from './components/SurveryNewPage'
export const metadata: Metadata = {
  title: 'IMAPR | Encuesta',
  description: 'INGENIERÍA MECÁNICA APLICADA DE POZA RICA S.A. DE C.V.',
}

// const Survey = () => <p>hola</p>
const Survey = () => <SurveryNewPage/>

export default Survey