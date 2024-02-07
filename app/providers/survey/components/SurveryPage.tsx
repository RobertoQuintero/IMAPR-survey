'use client'
import { BackButton } from '@/app/components'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { IAnswer, ISurvey } from '@/interfaces'
import { Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

const SurveryPage = () => {
  const {questions,answers,postSurvey,provider,surveyEntry,providersLoading} = useContext(ProvidersContext)
  const [newAnswers, setNewAnswers] = useState<IAnswer[]>([])
  const router= useRouter()
  
  const onClick =(a:IAnswer) =>{
    if(newAnswers.find(n=>n.id_question===a.id_question)){
      setNewAnswers(newAnswers.map(r=>r.id_question===a.id_question?a:r))
    }else{
      setNewAnswers(prev=>[...prev,a])
    }
  };

  const onPost = async() =>{
      let arr=[...newAnswers]
      if(arr.length!==7)return
     const newSurvey={
      id_survey:0,
      created_at:new Date(),
      id_answer_1:arr[0].id_answer,
      id_answer_2:arr[1].id_answer,
      id_answer_3:arr[2].id_answer,
      id_answer_4:arr[3].id_answer,
      id_answer_5:arr[4].id_answer,
      id_answer_6:arr[5].id_answer,
      id_answer_7:arr[6].id_answer,
      status:true,
      id_provider:provider?.id_provider,
      id_survey_entry:surveyEntry?.id_survey_entry
     } as ISurvey

    //  console.log(newSurvey  )
    //  return

     const ok=await postSurvey(newSurvey)
     if(ok){
      console.log('done')
      router.back()
     }
  };

  return (
  <>
  <BackButton/>
    <div>
      {
        questions.map(q=>(
          <FormControl key={q.id_question}>
            <FormLabel>
              {q.description}
            </FormLabel>
            <RadioGroup >
              {
                answers.filter(a=>a.id_question===q.id_question).map(p=>(
                  <FormControlLabel
                    sx={{padding:'0 0 0 2rem'}}
                    key={p.id_answer}
                    value={p.id_answer}
                    control={<Radio/>}
                    label={p.description}
                    onClick={()=>onClick(p)}
                    />
                    ))
                  }
            </RadioGroup>
          </FormControl>
        ))
      }
    </div>
     <div style={{paddingBottom:'2rem',textAlign:'right'}}>
     {
      providersLoading
        ? <CircularProgress/>
        :<Button
        onClick={onPost}
        variant='contained'
        color='success'
        >Enviar</Button>
     }
     </div>
    </>
  )
}

export default SurveryPage