import React, { useReducer,useEffect } from 'react'
import { ProvidersContext } from './ProvidersContext';
import { providersReducer } from './providersReducer'
import { IPaymentWay, IProvider } from '@/interfaces';
import { getProvidersRequest, postProvidersRequest } from './requestProvider';
import { IAnswer, IQuestion, ISurvey } from '@/interfaces/survey';
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
  }

const Providers_INITIAL_STATE:ProvidersState={
  providersLoading:false,
  providersError:undefined,
  provider:undefined,
  providers:[],
  paymentWays:[],
  answers:[],
  questions:[]
}

export const ProvidersProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(providersReducer, Providers_INITIAL_STATE)

  useEffect(() => {
    getResources()
  }, [])
  
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

  const getResources = async() =>{
    setIsLoading(false)
     Promise.all([
      getProvidersRequest('/catalog/payment_ways'),
      getProvidersRequest('/providers'),
      getProvidersRequest('/catalog/questions'),
      getProvidersRequest('/catalog/answers'),
     ]).then(resp=>{
      setPaymentWays(resp[0].data as IPaymentWay[])
      setProviders(resp[1].data as IProvider[])
      setQuestions(resp[2].data as IQuestion[])
      setAnswers(resp[3].data as IAnswer[])
     }).catch(error=>{
      console.log(error)
      setError('Error al cargar los datos')
      setIsLoading(false)
     })
  };

  const postProvider = async(payload:IProvider):Promise<boolean> =>
    getPostLoadingOrError('/providers',setProviders,payload,state.providers,'id_provider',true)

    
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
      postSurvey
    }}>
      {children}
    </ProvidersContext.Provider>
  )
}