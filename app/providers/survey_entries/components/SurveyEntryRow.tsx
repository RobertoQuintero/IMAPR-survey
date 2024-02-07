import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { ISurveyEntry } from '@/interfaces'
import { Button } from '@mui/material'
import Link from 'next/link'
import React, { useContext } from 'react'

interface Props{
  entry:ISurveyEntry
}

export const SurveyEntryRow = ({entry}:Props) => {

  const {setSurveyEntry,setActionString} = useContext(ProvidersContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = (action:string) =>{
      setActionString(action)
     setSurveyEntry(entry)
     toggleModal()
     
  };

  return (
    <div className='catalogRow'>
      <div style={{display:'flex', gap:'.5rem'}}>
        <p>{new Date(entry.updated_date).toLocaleString().split(',')[0]}</p>
        <p>{entry.description}</p>
      </div>
      <div>
        <Link href={`/providers/survey_providers`} onClick={()=>setSurveyEntry(entry)}>Ver</Link>
      <Button
          size='small'
          onClick={()=>onClick('EDIT')}
          >editar</Button>
      <Button
          size='small'
          onClick={()=>onClick('DELETE')}
          >Borrar</Button>
      </div>
    </div>
  )
}
