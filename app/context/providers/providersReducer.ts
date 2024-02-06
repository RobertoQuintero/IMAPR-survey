import { IAnswer, IPaymentWay, IProvider, IQuestion } from '@/interfaces'
import { ProvidersState } from './ProvidersProvider'

type ProvidersActionType=
          {type:'[Providers] - setLoading',payload:boolean}
        | {type:'[Providers] - setProvider',payload:IProvider | undefined}  
        | {type:'[Providers] - setProviders',payload:IProvider[] }  
        | {type:'[Providers] - setError',payload:string | undefined }  
        | {type:'[Providers] - setPaymentWays',payload:IPaymentWay[] }  
        | {type:'[Providers] - setQuestions',payload:IQuestion[] }  
        | {type:'[Providers] - setAnswers',payload:IAnswer[] }  
        
export const providersReducer = (state:ProvidersState,action:ProvidersActionType):ProvidersState => {
  
  switch (action.type) {
    case '[Providers] - setLoading':
      return {
        ...state,
        providersLoading:action.payload
      }
    case '[Providers] - setError':
      return {
        ...state,
        providersError:action.payload
      }
    case '[Providers] - setProvider':
      return {
        ...state,
        provider:action.payload
      }
    case '[Providers] - setProviders':
      return {
        ...state,
        providers:action.payload
      }

    case '[Providers] - setPaymentWays':
      return {
        ...state,
        paymentWays:action.payload
      }

    case '[Providers] - setQuestions':
      return {
        ...state,
        questions:action.payload
      }

    case '[Providers] - setAnswers':
      return {
        ...state,
        answers:action.payload
      }

    default:
      return state
  }
}