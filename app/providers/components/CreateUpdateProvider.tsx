'use client'
import React, { useContext } from 'react'
import { Button, CircularProgress, MenuItem, Switch, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { UiContext } from '@/app/context/ui/UiContext'
import { IProvider } from '@/interfaces/provider'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'

const sx={position:'relative', zIndex:0}

export const CreateUpdateProvider = () => {
  const {toggleModal} = useContext(UiContext)
  const {provider,providersError,providersLoading,paymentWays,postProvider,setProvider} = useContext(ProvidersContext)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProvider>()

  const values ={
    id_provider:provider?provider.id_provider:0,
    key_string:provider?provider.key_string:'',
    legal_name:provider?provider.legal_name:'',
    tax_id:provider?provider.tax_id:'',
    description:provider?provider.description:'',
    sales_agent:provider?provider.sales_agent:'',
    phone:provider?provider.phone:'',
    name:provider?provider.name:'',
    status:provider?provider.status:true,
    created_at:provider?provider.created_at:'',
    updated_at:provider?provider.updated_at:'',
    id_payment_way:provider?provider.id_payment_way:1,
    street:provider?provider.street:'',
    neighborhood:provider?provider.neighborhood:'',
    exterior:provider?provider.exterior:'',
    city:provider?provider.city:'',
    state:provider?provider.state:'',
    zip:provider?provider.zip:'',
    id_tax_system:provider?provider.id_tax_system:1,
    email:provider?provider.email:'',
  }

  const [checked, setChecked] = React.useState(values.status);

  const onSubmit=async(data:IProvider)=>{
    const date = new Date()
    data.id_provider= values.id_provider
    data.status= checked
    data.created_at=date
    data.updated_at=date
    data.legal_name= data.legal_name.toUpperCase()
    data.id_tax_system=values.id_tax_system
    data.rank=0

    const ok= await postProvider(data)
      if(ok){
        toggleModal()
        setProvider(undefined)
      }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className='FormLong'>
        <div className="itemCardRow">
          <TextField
            size="small"
            label='Folio'
            fullWidth
            type="text"
            defaultValue={values.key_string} 
            {...register('key_string',{
            required:'Este campo es requerido',
            })}
            error={!!errors.key_string}
            helperText={errors.key_string?.message}
              />
          <TextField
            size="small"
            label='Nombre Comercial'
            fullWidth
            type="text"
            defaultValue={values.name} 
            {...register('name',{
            required:'Este campo es requerido',
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
              />
        </div>
      <TextField
        size="small"
        label='Razón Social'
        fullWidth
        type="text"
        defaultValue={values.legal_name} 
        {...register('legal_name',{
        required:'Este campo es requerido',
        })}
        error={!!errors.legal_name}
        helperText={errors.legal_name?.message}
          />
      <TextField
        size="small"
        label='R.F.C.'
        fullWidth
        type="text"
        defaultValue={values.tax_id} 
        {...register('tax_id',{
        required:'Este campo es requerido',
        })}
        error={!!errors.tax_id}
        helperText={errors.tax_id?.message}
          />
      <TextField
        size="small"
        label='Bien o servicio'
        fullWidth
        type="text"
        defaultValue={values.description} 
        {...register('description',{
        required:'Este campo es requerido',
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
          />
      <TextField
        size="small"
        label='Agente de ventas'
        fullWidth
        type="text"
        defaultValue={values.sales_agent} 
        {...register('sales_agent',{
        required:'Este campo es requerido',
        })}
        error={!!errors.sales_agent}
        helperText={errors.sales_agent?.message}
          />
      <div className="itemCardRow">
      <TextField
        size="small"
        label='Calle'
        fullWidth
        type="text"
        defaultValue={values.street} 
        {...register('street')}
          />
      <TextField
        size="small"
        label='Número'
        fullWidth
        type="text"
        defaultValue={values.exterior} 
        {...register('exterior')}
          />
      </div>
      <div className="itemCardRow">
      <TextField
        size="small"
        label='Colonia'
        fullWidth
        type="text"
        defaultValue={values.neighborhood} 
        {...register('neighborhood')}
          />
           <TextField
        size="small"
        label='C.P.'
        placeholder="Código Postal"
        type='number'
        fullWidth 
        defaultValue={values.zip} 
        {...register('zip')}
      />
      </div>
      <div className="itemCardRow">
      <TextField
        size="small"
        label='Ciudad'
        fullWidth
        type="text"
        defaultValue={values.city} 
        {...register('city')}
          />
      <TextField
        size="small"
        label='Estado'
        fullWidth
        type="text"
        defaultValue={values.state} 
        {...register('state')}
          />
      </div>
      <div className="itemCardRow">
        <TextField
          size="small"
          sx={sx}
          label='Forma de pago'
          fullWidth
          defaultValue={values.id_payment_way}
          {...register('id_payment_way')} 
          select >
          {
            paymentWays.length
            ?paymentWays.map(item=>(
              <MenuItem 
                key={item.id_payment_way} 
                value={item.id_payment_way}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <div style={{display:'flex', alignItems:'center',width:'100%',justifyContent:'flex-end'}}>
        <p>{checked?'Activo':'Inactivo'}</p>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        </div>  
      </div>
      <div className="itemCardRow">
        <TextField
          size="small"
          label='Email'
          fullWidth
          placeholder="user@gmail.com (opcional)"
          type="email"
          defaultValue={values.email} 
          {...register('email')}
            />
        <TextField
          size="small"
          label='Teléfono'
          fullWidth
          placeholder="9998887777 (opcional)"
          type="text"
          defaultValue={values.phone} 
          {...register('phone')}
            />
      </div>
      {providersError&&<p className='errorMessage'>{providersError}</p>}
      <Button
        size="small"
        type='submit'
        variant="contained"
        fullWidth     
        disabled={providersLoading} >
        {
          providersLoading
          ?<CircularProgress size='1.5rem' />
          :'Guardar'
        }
      </Button>
    </form>
  )
}
