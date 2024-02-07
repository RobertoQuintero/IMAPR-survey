'use client'
import { BackButton, EmptyPage, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button, MenuItem, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { SurveyRow } from '.'
import { IProvider } from '@/interfaces'

const SurveyProvidersPage = () => {
  const {toggleModal} = useContext(UiContext)
  const  {setActionString,providers,setProvider,surveys,surveyEntry,getSurveys,providersLoading}= useContext(ProvidersContext)
  const router= useRouter()
  const newProviders = () =>{
    const array=[] as IProvider[]
    for (const p of providers) {
      if(!surveys.find(a=>a.id_provider==p.id_provider)){
          array.push(p)
      }
    }
    return array
  };
  
  
  useEffect(() => {
    getSurveys(surveyEntry?.id_survey_entry!)
  }, [surveyEntry])
  
  // if(providersLoading){
  //   return <LoadingComponent/>
  // }

  
  const [newProvider, setNewProvider] = useState('')

  return (
    <>
     <div className='actionCreateContainer'>
        <div style={{display:'flex',gap:'1rem'}}>
        <BackButton/>
        <TextField
          sx={{width:200}}
          size="small"
          label='Proveedor'
          fullWidth
          value={newProvider}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNewProvider(event.target.value);
            setProvider(providers.find(p=>p.id_provider===Number(event.target.value)))
            router.push('/providers/survey')
          }}
          select >
          {
            newProviders().length
            ?newProviders().map(item=>(
              <MenuItem 
                key={item.id_provider} 
                value={item.id_provider}>
                {item.name}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        </div>
        <div></div>
   
      </div>
      <div>
        {
          surveys.length
            ?surveys.map(a=><SurveyRow survey={a} key={a.id_survey}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        <></>
      </AppModal>
    </>
  )
}

export default SurveyProvidersPage