import React from 'react'
import ChartPage from './components/ChartPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IMAPR | Gráfica',
  description: 'INGENIERÍA MECÁNICA APLICADA DE POZA RICA S.A. DE C.V.',
}

const Chart = () => <ChartPage/>

export default Chart