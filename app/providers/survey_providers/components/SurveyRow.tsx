import { ISurvey } from '@/interfaces'
import React from 'react'

interface Props{
  survey:ISurvey
}

export const SurveyRow = ({survey}:Props) => {
  return (
    <div className='catalogRow'>
      <div style={{display:'flex'}}>
        <p style={{width:300}}>{survey.provider}</p>
        <p>{survey.total}%</p>
      </div>
    </div>
  )
}
