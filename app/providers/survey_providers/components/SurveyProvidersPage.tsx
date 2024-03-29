'use client'
import { BackButton, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { Button, MenuItem, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { SurveyRow } from '.'
import { IProvider } from '@/interfaces'
import Link from 'next/link'

const SurveyProvidersPage = () => {
  const  {providers,setProvider,surveys,surveyEntry,getSurveys}= useContext(ProvidersContext)
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
        {
          newProviders().length
            ?<TextField
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
          :<></>
        }
        </div>
        <Link href='/providers/chart'>
          <Button
            size='small'
            variant='contained'
            color='warning'
            >Gráfica</Button>
        </Link>
      </div>
      <h4 style={{textAlign:'center'}}>{surveyEntry?.description}</h4>
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