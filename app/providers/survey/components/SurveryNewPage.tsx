'use client'
import { BackButton } from '@/app/components'
import { ProvidersContext } from '@/app/context/providers/ProvidersContext'
import { IAnswer, IProvider, ISurvey, ISurveyEntry } from '@/interfaces'
import { Button, CardActionArea, CircularProgress, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'

const SurveryNewPage = () => {
  const {questions,answers,postSurvey,provider,surveyEntry,providersLoading,surveyEntries,providers,setProvider,setSurveyEntry,postSurveyEntryName} = useContext(ProvidersContext)
  const [newAnswers, setNewAnswers] = useState<IAnswer[]>([])
  const [show, setShow] = useState(false)
  const dataProviders=[{ id_provider:0,name:'ELEGIR'}as IProvider,...providers] as IProvider[]
  const dataEntries=[{id_survey_entry:0,description:'ELEGIR'} as ISurveyEntry,...surveyEntries] as ISurveyEntry[]
  const [entryName, setEntryName] = useState('')

  const [newProvider, setNewProvider] = useState(dataProviders[0].id_provider)
  const [newEntries, setNewEntries] = useState(dataEntries[0].id_survey_entry)

  useEffect(() => {
    setProvider(undefined)
    setSurveyEntry(undefined)
  }, [])
  
  
  const onClick =(a:IAnswer) =>{
    if(newAnswers.find(n=>n.id_question===a.id_question)){
      setNewAnswers(newAnswers.map(r=>r.id_question===a.id_question?a:r))
    }else{
      setNewAnswers(prev=>[...prev,a])
    }
  };

  const onPost = async() =>{
      let arr=[...newAnswers].sort((a,b)=>a.id_question-b.id_question)
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

     const ok=await postSurvey(newSurvey)
     if(ok){
      // setNewEntries(0)
      setNewProvider(0)
      setProvider(undefined)
      // setSurveyEntry(undefined)
     }
  };

  const onSubmit = async(e:SyntheticEvent) =>{
     e.preventDefault()
  
     let newData={
      id_survey_entry:0,
      status:true,
      description:entryName,
     } as ISurveyEntry
     
     const {ok,data} = await postSurveyEntryName(newData)
     if(ok){
      setNewEntries((data as ISurveyEntry).id_survey_entry)
      setShow(false)
     }
  };

  return (
  <>
   <div style={{display:'flex', gap:'.5rem',padding:'0 0 2rem'}}>
    {/* <BackButton/> */}
    <TextField
      sx={{width:200}}
      size="small"
      label='Proveedor'
      value={newProvider}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProvider(+event.target.value);
        setProvider(providers.find(p=>p.id_provider===Number(event.target.value)))
      }}
      select >
      {
        dataProviders.length
        ?dataProviders.map(item=>(
          <MenuItem 
            key={item.id_provider} 
            value={item.id_provider}>
            {item.name}
          </MenuItem>
        ))
        :<div></div>
      }
    </TextField>
{
  !show  
    ? <TextField
        sx={{width:200}}
        size="small"
        label='Encuesta'
        value={newEntries}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNewEntries(+event.target.value);
          setSurveyEntry(surveyEntries.find(p=>p.id_survey_entry===Number(event.target.value)))
        }}
        select >
    {
      dataEntries.length
      ?dataEntries.map(item=>(
        <MenuItem 
          key={item.id_survey_entry} 
          value={item.id_survey_entry}>
          {item.description}
        </MenuItem>
      ))
      :<div></div>
    }
  </TextField>
  :  <form onSubmit={onSubmit}>
      <TextField 
      size='small'
      sx={{width:200}}
      label='Nombre/Referencia'
      type="text"
      value={entryName}
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        setEntryName(e.target.value)
      }}
      />
  </form>
}
    <CardActionArea
      onClick={()=>setShow(prev=>!prev)}
      style={{
        backgroundColor:'#fff',
        padding:'0 .5rem',
        border:'1px solid #ccc',
        borderRadius:'3px',
        width:'40px',
        fontSize:'2rem',
        textAlign:'center'
      }}
    >
      {show?'x':'+'}
    </CardActionArea>
  </div> 
    {
      provider&&surveyEntry
        ?<>
          <h4 style={{textAlign:'center',padding:'0 0 1rem'}}>{provider.key_string} - {provider?.name}</h4>
    <div>
      {
        questions.map((q,i)=>(
          <FormControl key={i}>
            <FormLabel>
              {q.description}
            </FormLabel>
            <RadioGroup >
              {
                answers.filter((a)=>a.id_question===q.id_question).map((p,j)=>(
                  <FormControlLabel
                    sx={{padding:'0 0 0 2rem'}}
                    key={j}
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
        :<></>
    }
    </>
  )
}

export default SurveryNewPage