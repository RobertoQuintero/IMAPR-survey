'use client'
import React,{useContext} from 'react'
import { Button } from '@mui/material'
import { UiContext } from '@/app/context/ui/UiContext'
import AppModal from '@/app/components/AppModal'
import { CreateUpdateProvider, ProviderCard } from '.'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { DeleteComponent, EmptyPage } from '@/app/components'
import { IProvider } from '@/interfaces'

const ProvidersPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {providers,setProvider,actionString,setActionString,provider,providersLoading,providersError,postProvider} = useContext(ProvidersContext)

 
  const onAdd=()=>{
    setActionString(undefined)
    setProvider(undefined)
    toggleModal()
  }
  const onDelete = async() =>{
     const data= {
      ...provider,
      status:false
     } as IProvider
    
     const ok= await postProvider(data)
     if(ok){
       toggleModal()
       setProvider(undefined)
     }
  };

  return (
    <>
      <div className="actionCreateContainer">
        <div></div>
        <Button 
        onClick={onAdd}
        variant='contained' 
        color='success'
        size='small'>Nuevo</Button>
      </div>
      <div className="pageCardList">
        {
          providers.filter(p=>p.status).length
            ? providers.filter(p=>p.status).map(p=>(<ProviderCard key={p.id_provider} provider={p}/>))
            : <EmptyPage/>
        }
      </div>
      <AppModal>
        {
          actionString==='EDIT'||actionString===undefined?<CreateUpdateProvider/>:<></>
        }
        {
          actionString==='DELETE'?<DeleteComponent onDelete={onDelete} loading={providersLoading} error={providersError}/>:<></>
        }
      </AppModal>
    </>
  )
}

export default ProvidersPage