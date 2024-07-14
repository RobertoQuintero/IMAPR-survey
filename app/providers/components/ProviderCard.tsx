import { ProvidersContext } from "@/app/context/providers/ProvidersContext"
import { UiContext } from "@/app/context/ui/UiContext"
import { IProvider } from "@/interfaces"
import { Button } from "@mui/material"
import { useContext } from "react"

interface Props{
  provider:IProvider
}

export const ProviderCard = ({provider}:Props) => {
  const {setProvider,setActionString} = useContext(ProvidersContext)
  const {toggleModal} = useContext(UiContext)
  const {legal_name,name,tax_id,sales_agent,phone,street,exterior,neighborhood,city,state,payment_way_name}= provider

  const onClick = (word:string) =>{
    setActionString(word)
    setProvider(provider)
    toggleModal()
  };
  return (
    <div className="itemCard">
      <div>
      <div className="itemCardRow">
        <p>{name}</p>
        <p><strong>R.F.C.</strong> {tax_id}</p>
      </div>
      <div className="itemCardRow">
        <p>{legal_name}</p>
      </div>
      <div className="itemCardRow">
        <p>{sales_agent}</p>
        <p>{phone}</p>
      </div>
      <div className="itemCardRow">
        <p>{street} #{exterior} Col. {neighborhood} {city} {state}</p>
      </div>
      <div className="itemCardRow">
        <p>{payment_way_name}</p>
      </div>

      </div>
      <div className="cardButtons">
        <Button 
          onClick={()=>onClick('EDIT')}
          size='small' 
          variant='outlined'>EDITAR</Button>
        <Button 
          onClick={()=>onClick('DELETE')}
          size='small' 
          variant='outlined' color="error">borrar</Button>
      </div>
    </div>
  )
}
