import { IAnswer, IPaymentWay, IProvider, IQuestion, ISurvey, ISurveyEntry } from '@/interfaces'
import { ProvidersState } from './ProvidersProvider'

type ProvidersActionType=
          {type:'[Providers] - setLoading',payload:boolean}
        | {type:'[Providers] - setProvider',payload:IProvider | undefined}  
        | {type:'[Providers] - setProviders',payload:IProvider[] }  
        | {type:'[Providers] - setError',payload:string | undefined }  
        | {type:'[Providers] - setPaymentWays',payload:IPaymentWay[] }  
        | {type:'[Providers] - setQuestions',payload:IQuestion[] }  
        | {type:'[Providers] - setAnswers',payload:IAnswer[] }  
        | {type:'[Providers] - setSurveyEntries',payload:ISurveyEntry[] }  
        | {type:'[Providers] - setSurveyEntry',payload:ISurveyEntry | undefined }  
        | {type:'[Providers] - setSurveys',payload:ISurvey[] }  
        | {type:'[Providers] - setActionString',payload:string | undefined }  
        
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

    case '[Providers] - setSurveys':
      return {
        ...state,
        surveys:action.payload
      }

    case '[Providers] - setSurveyEntries':
      return {
        ...state,
        surveyEntries:action.payload
      }

    case '[Providers] - setSurveyEntry':
      return {
        ...state,
        surveyEntry:action.payload
      }

    case '[Providers] - setActionString':
      return {
        ...state,
        actionString:action.payload
      }

    default:
      return state
  }
}