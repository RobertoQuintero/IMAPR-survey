import React, { useReducer,useEffect } from 'react'
import { ProvidersContext } from './ProvidersContext';
import { providersReducer } from './providersReducer'
import { IPaymentWay, IProvider } from '@/interfaces';
import { getProvidersRequest, postProvidersRequest } from './requestProvider';

interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface ProvidersState{
  providersLoading:boolean;
  providersError: string | undefined;
  provider:IProvider | undefined;
  providers:IProvider[],
  paymentWays:IPaymentWay[]
  }

const Providers_INITIAL_STATE:ProvidersState={
  providersLoading:false,
  providersError:undefined,
  provider:undefined,
  providers:[],
  paymentWays:[]
}

export const ProvidersProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(providersReducer, Providers_INITIAL_STATE)

  useEffect(() => {
    getResources()
  }, [])
  

  const setLoading = async(payload:boolean) =>{
     dispatch({
      type:'[Providers] - setLoading',
      payload
     })
  };
  const setError = async(payload:string | undefined) =>{
     dispatch({
      type:'[Providers] - setError',
      payload
     })
  };

  const setProvider = async(payload:IProvider | undefined) =>{
     dispatch({
      type:'[Providers] - setProvider',
      payload
     })
  };

  const setProviders = async(payload:IProvider[]) =>{
     dispatch({
      type:'[Providers] - setProviders',
      payload
     })
  };
  const setPaymentWays = async(payload:IPaymentWay[]) =>{
     dispatch({
      type:'[Providers] - setPaymentWays',
      payload
     })
  };

  const getResources = async() =>{
    setLoading(false)
     Promise.all([
      getProvidersRequest('/catalog/payment_ways'),
      getProvidersRequest('/providers')
     ]).then(resp=>{
      setPaymentWays(resp[0].data as IPaymentWay[])
      setProviders(resp[1].data as IProvider[])
     }).catch(error=>{
      console.log(error)
      setError('Error al cargar los datos')
      setLoading(false)
     })
  };

  const postProvider = async(provider:IProvider):Promise<boolean> =>{
    setLoading(true)
    const {ok,data}= await postProvidersRequest('/providers',provider)
    let newProviders:IProvider[]=[]
    if(ok){
      if(provider.id_provider){
        newProviders= state.providers.map(p=>{
         if(p.id_provider=== provider.id_provider){
           return data as IProvider
         }
         return p
       })
     }else{
       newProviders=[data as IProvider,...state.providers]
     }
     setProviders(newProviders)
    }else{
    setError(data as string)
    }
    setLoading(false)
    return ok
  };

  return (
    <ProvidersContext.Provider value={{
      ...state,
      setProvider,
      setProviders,
      postProvider
    }}>
      {children}
    </ProvidersContext.Provider>
  )
}