'use client'
import { DatePickerElement } from '@/app/components'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { ISurveyEntry } from '@/interfaces'
import { Button, CircularProgress,  TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateSurveyEntry = () => {
  const {toggleModal} = useContext(UiContext)
  const {surveyEntry,providersLoading,postSurveyEntry} = useContext(ProvidersContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISurveyEntry>()
  
  const values={
    id_survey_entry:surveyEntry?surveyEntry.id_survey_entry:0,
    description:surveyEntry?surveyEntry.description:'',
    updated_date:surveyEntry?new Date(surveyEntry.updated_date):new Date(),
    status:surveyEntry?surveyEntry.status:true,
  } as ISurveyEntry
  const [startDate, setStartDate] = useState<Date | null>(new Date(values.updated_date))


  const onSubmit=async(data:ISurveyEntry)=>{
    const date= new Date()
    data.id_survey_entry=values.id_survey_entry
    data.created_at=date
    data.updated_date=startDate!
    data.status= values.status
    const ok = await postSurveyEntry(data)
    if(ok){
      toggleModal()
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Descripción'
        type="text"
        defaultValue={values.description}
        {...register('description',{
          required:'Este campo es requerido',
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
        />
        <div>
          <DatePickerElement date={startDate} setDate={setStartDate}/>
        </div>
        
        <Button 
          size="small"
          disabled={providersLoading}
          type='submit' 
          fullWidth 
          variant='contained'
          >
            {
              providersLoading
                ?  <CircularProgress size='1.5rem' />
                :'Guardar'
            }
      </Button>
    </form>
  )
}
