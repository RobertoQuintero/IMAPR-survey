import React, { useReducer,useEffect } from 'react'
import { ProvidersContext } from './ProvidersContext';
import { providersReducer } from './providersReducer'
import { IPaymentWay, IProvider } from '@/interfaces';
import { getProvidersRequest, postProvidersRequest } from './requestProvider';
import { IAnswer, IQuestion, ISurvey, ISurveyEntry } from '@/interfaces/survey';
import { returnArray } from '../auth/authRequest';

interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface ProvidersState{
  providersLoading:boolean;
  providersError: string | undefined;
  provider:IProvider | undefined;
  providers:IProvider[],
  paymentWays:IPaymentWay[]
  answers:IAnswer[];
  questions:IQuestion[];
  surveyEntries:ISurveyEntry[];
  surveyEntry:ISurveyEntry | undefined;
  surveys:ISurvey[];
  actionString:string | undefined;
  }

const Providers_INITIAL_STATE:ProvidersState={
  providersLoading:false,
  providersError:undefined,
  provider:undefined,
  providers:[],
  paymentWays:[],
  answers:[],
  questions:[],
  surveyEntries:[],
  surveyEntry:undefined,
  surveys:[],
  actionString:undefined
}

export const ProvidersProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(providersReducer, Providers_INITIAL_STATE)

  useEffect(() => {
    getResources()
  }, [])
  
  

  const getResources = async() =>{
    setIsLoading(false)
     Promise.all([
      getProvidersRequest('/catalog/payment_ways'),
      getProvidersRequest('/providers'),
      getProvidersRequest('/catalog/questions'),
      getProvidersRequest('/catalog/answers'),
      getProvidersRequest('/survey_entries'),
     ]).then(resp=>{
      setPaymentWays(resp[0].data as IPaymentWay[])
      setProviders(resp[1].data as IProvider[])
      setQuestions(resp[2].data as IQuestion[])
      setAnswers(resp[3].data as IAnswer[])
      setSurveyEntries(resp[4].data as ISurveyEntry[])
     }).catch(error=>{
      console.log(error)
      setError('Error al cargar los datos')
      setIsLoading(false)
     })
  };

  const postProvider = async(payload:IProvider):Promise<boolean> =>
    getPostLoadingOrError('/providers',setProviders,payload,state.providers,'id_provider',true)
 
    const postSurveyEntry = async(payload:ISurveyEntry):Promise<boolean> =>
    getPostLoadingOrError('/survey_entries',setSurveyEntries,payload,state.surveyEntries,'id_survey_entry',true)

   const getSurveys = async(payload:number) =>{
       return await  getPostLoadingOrError(`/surveys?id_survey_entry=${payload}`,setSurveys)
   };   

   
   const postSurveyEntryName = async(payload:ISurveyEntry):Promise<{ok:boolean,data:string|ISurveyEntry}> =>{
       setIsLoading(true)
        const {ok,data}=await postProvidersRequest(`/survey_entries`,payload)
        if(ok){
         setSurveyEntry(data as ISurveyEntry)
         setSurveyEntries([data as ISurveyEntry,...state.surveyEntries])
        }
        else{
         setError(data as string)
        }
        setIsLoading(false)
        return {ok,data:data as ISurveyEntry}
     };

    
    const postSurvey = async(payload:ISurvey) =>{
        setIsLoading(true)
         const {ok,data}=await postProvidersRequest(`/surveys`,payload)
         if(ok){
          console.log(data)
         }
         else{
          setError(data as string)
         }
         setIsLoading(false)
         return ok
      };

      const setIsLoading =(payload:boolean) =>{
        dispatch({
         type:'[Providers] - setLoading',
         payload
        })
     };
     const setError =(payload:string | undefined) =>{
        dispatch({
         type:'[Providers] - setError',
         payload
        })
     };
   
     const setProvider =(payload:IProvider | undefined) =>{
        dispatch({
         type:'[Providers] - setProvider',
         payload
        })
     };
   
     const setProviders =(payload:IProvider[]) =>{
        dispatch({
         type:'[Providers] - setProviders',
         payload
        })
     };
     const setPaymentWays =(payload:IPaymentWay[]) =>{
        dispatch({
         type:'[Providers] - setPaymentWays',
         payload
        })
     };
   
     const setQuestions =(payload:IQuestion[]) =>{
        dispatch({
         type:'[Providers] - setQuestions',
         payload
        })
     };
   
     const setAnswers =(payload:IAnswer[]) =>{
        dispatch({
         type:'[Providers] - setAnswers',
         payload
        })
     };
   
     const setSurveyEntries =(payload:ISurveyEntry[]) =>{
        dispatch({
         type:'[Providers] - setSurveyEntries',
         payload
        })
     };
   
     const setSurveyEntry =(payload:ISurveyEntry | undefined) =>{
        dispatch({
         type:'[Providers] - setSurveyEntry',
         payload
        })
     };
   
     const setSurveys =(payload:ISurvey[]) =>{
        dispatch({
         type:'[Providers] - setSurveys',
         payload
        })
     };
     const setActionString =(payload:string | undefined) =>{
        dispatch({
         type:'[Providers] - setActionString',
         payload
        })
     };

  const getPostLoadingOrError = async<T,K extends keyof T>(
    endpoint:string,setState:(payload: T[]) => void,payload?:T,state?:T[],id?:K,wich?:boolean
 ) =>{
 setError(undefined)
 setIsLoading(true)
 const {ok,data}= wich ? await  postProvidersRequest(endpoint,payload): await getProvidersRequest(endpoint)
 if(ok){
    wich
       ?setState(returnArray(payload as object,data as object,state as object[],id as never) as T[])
       :setState(data as T[])
 }
 else{
  setError(data as string)
 }
 setIsLoading(false)
 return ok
};



  return (
    <ProvidersContext.Provider value={{
      ...state,
      setProvider,
      setProviders,
      postProvider,
      postSurvey,
      setSurveyEntry,
      postSurveyEntry,
      setActionString,
      getSurveys,
      postSurveyEntryName
    }}>
      {children}
    </ProvidersContext.Provider>
  )
}