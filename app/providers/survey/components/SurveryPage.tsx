'use client'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { IAnswer, ISurvey } from '@/interfaces'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useContext, useState } from 'react'

const SurveryPage = () => {
  const {questions,answers,postSurvey} = useContext(ProvidersContext)
  const [newAnswers, setNewAnswers] = useState<IAnswer[]>([])
  
  const onClick =(a:IAnswer) =>{
    if(newAnswers.find(n=>n.id_question===a.id_question)){
      setNewAnswers(newAnswers.map(r=>r.id_question===a.id_question?a:r))
    }else{
      setNewAnswers(prev=>[...prev,a])
    }
  };

  const onPost = async() =>{
      let arr=[...newAnswers]
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
      id_provider:1
     } as ISurvey

     const ok=await postSurvey(newSurvey)
     if(ok){
      console.log('done')
     }
  };

  return (
  <>
    <div>
      {
        questions.map(q=>(
          <FormControl>
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
      <Button
        onClick={onPost}
        variant='contained'
        color='success'
        >Enviar</Button>
    </>
  )
}

export default SurveryPage