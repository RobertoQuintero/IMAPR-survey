'use client'
import { TextField, Button, CircularProgress } from '@mui/material'
import styles from './components.module.css'
import {  useContext } from 'react'
import { User } from '@/interfaces'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/auth/AuthContext'
import { UiContext } from '../context/ui/UiContext'

export const RegisterForm = () => {
  const {toggleModal} = useContext(UiContext)
  const {register:authRegister,authLoading,error} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()

  const onSubmit=async (data:User)=>{

    console.log(data)
    const ok=await authRegister(data)
    if(ok){
      toggleModal()
      // location.reload()
    }
  }

  return (
    <form 
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
      >
      <p className={styles.formTitle}>Registro</p>
        <TextField
          fullWidth
          label='Nombre'
          placeholder="Nombre Apellidos" 
          type="text"
          {...register('name',{
          required:'Este campo es requerido',
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          />
        <TextField
          fullWidth
          label='Email'
          placeholder="user@gmail.com" 
          type="email"
          {...register('email',{
          required:'Este campo es requerido',
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          />
        <TextField
          fullWidth
          label='Password'
          placeholder="******" 
          type="password"
          {...register('password',{
          required:'Este campo es requerido',
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          />
          <TextField
          fullWidth
          label='Dirección'
          placeholder="Calle,#,Colonia,C.P." 
          type="text"
          {...register('address',{
          required:'Este campo es requerido',
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
          />
        <div className={styles.flexPhone}>
          <TextField
            label='C.P.'
            placeholder="Código Postal" 
            type="number"
            {...register('postal_code',{
          required:'Este campo es requerido',
          })}
          error={!!errors.postal_code}
          helperText={errors.postal_code?.message}
            />
          <TextField
            fullWidth
            label='Teléfono'
            placeholder="782111222" 
            type="number"
            {...register('phone',{
          required:'Este campo es requerido',
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
            />
        </div>
        <p className={styles.errorMessage}>
        {error?error:''}
      </p>
      <Button 
          disabled={authLoading}
          type='submit' 
          fullWidth 
          variant='contained'
          >
            {
              authLoading
                ?  <CircularProgress size='1.5rem' />
                :'Registrar'
            }
      </Button> 
    </form>
  )
}
