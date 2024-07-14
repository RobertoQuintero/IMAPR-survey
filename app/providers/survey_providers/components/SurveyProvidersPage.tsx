'use client'
import { BackButton, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useContext, useEffect} from 'react'
import { SurveyRow } from '.'
import { IProvider } from '@/interfaces'
import Link from 'next/link'

const SurveyProvidersPage = () => {
  const  {providers,surveys,surveyEntry,getSurveys}= useContext(ProvidersContext)
    
  useEffect(() => {
    getSurveys(surveyEntry?.id_survey_entry!)
  }, [surveyEntry])
  
  // if(providersLoading){
  //   return <LoadingComponent/>
  // }

  return (
    <>
     <div className='actionCreateContainer'>
        <BackButton/>
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