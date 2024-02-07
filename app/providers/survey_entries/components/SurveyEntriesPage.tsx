'use client'
import { BackButton, DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { PostUpdateSurveyEntry, SurveyEntryRow } from '.'
import { ISurveyEntry } from '@/interfaces'

const SurveyEntriesPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {surveyEntries,setSurveyEntry,actionString,providersError,providersLoading,surveyEntry,postSurveyEntry,setActionString} = useContext(ProvidersContext)

  const onAdd = async() =>{
    setActionString(undefined)
    setSurveyEntry(undefined)
     toggleModal()
  };

  const onDelete = async() =>{
     const newEntry={...surveyEntry, status:false} as ISurveyEntry

     const ok=await postSurveyEntry(newEntry)
     if(ok){
      toggleModal()
     }
  };

  return (
    <>
     <div className='actionCreateContainer'>
        {/* <BackButton/> */}
        <div></div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        {
          surveyEntries.filter(s=>s.status).length
            ?surveyEntries.filter(s=>s.status).map(a=><SurveyEntryRow entry={a} key={a.id_survey_entry}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
            actionString==='EDIT' || actionString===undefined?<PostUpdateSurveyEntry/>:<></>
        }
        {
          actionString==='DELETE' 
            ?<DeleteComponent onDelete={onDelete} error={providersError} loading={providersLoading}/>
            :<></>
        }
      </AppModal>
    </>
  )
}

export default SurveyEntriesPage