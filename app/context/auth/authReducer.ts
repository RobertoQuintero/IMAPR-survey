'use client'
import { User } from '@/interfaces'
import { AuthState } from './AuthProvider'

type authActionType=
          {type:'[auth] - login',payload:User}
         |{type:'[auth] - logout',payload:AuthState}
         |{type:'[auth] - isLoading',payload:boolean}
         |{type:'[auth] - setIsError',payload:string}
         |{type:'[auth] - setShowForm',payload:boolean}
        
export const authReducer = (state:AuthState,action:authActionType):AuthState => {
  
  switch (action.type) {
    case '[auth] - login':
      return {
        ...state,
        logged:true,
        user:action.payload,
        error:undefined
      }
    
    case '[auth] - logout':
      return {
        ...state,
        ...action.payload,
        authLoading:false,
      }

    case '[auth] - isLoading':
      return {
        ...state,
        authLoading:action.payload
      }

    case '[auth] - setIsError':
      return {
        ...state,
        error:action.payload,
      }
    case '[auth] - setShowForm':
      return {
        ...state,
        showForm:action.payload,
      }

    default:
      return state
  }
}