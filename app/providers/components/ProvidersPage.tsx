'use client'
import React,{useContext} from 'react'
import { Button } from '@mui/material'
import { UiContext } from '@/app/context/ui/UiContext'
import AppModal from '@/app/components/AppModal'
import { CreateUpdateProvider, ProviderCard } from '.'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { EmptyPage } from '@/app/components'

const ProvidersPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {providers,setProvider} = useContext(ProvidersContext)

 
  const onAdd=()=>{
    setProvider(undefined)
    toggleModal()
  }
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
          providers.length
            ? providers.map(p=>(<ProviderCard key={p.id_provider} provider={p}/>))
            : <EmptyPage/>
        }
      </div>
      <AppModal>
        <CreateUpdateProvider/>
      </AppModal>
    </>
  )
}

export default ProvidersPage