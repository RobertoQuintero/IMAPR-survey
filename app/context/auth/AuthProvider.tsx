'use client'
import { useEffect, useReducer } from 'react'
import { User } from '@/interfaces';
import { loginRequest, registerRequest, validateTokenRequest } from './authRequest';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie'

interface Props{
  children:JSX.Element|JSX.Element[]
}
export interface AuthState{
  authLoading:boolean;
  logged:boolean;
  user: User | undefined;
  error:string | undefined;
  showForm:boolean;
}

const Auth_INITIAL_STATE:AuthState={
  authLoading:true,
  logged:false,
  user: undefined,
  error:undefined,
  showForm:false
}

export const AuthProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)
 
  useEffect(() => {
    checkToken()
  }, [])

  const checkToken=async()=>{
    const{ok,data}= await validateTokenRequest()
    if(ok){
      dispatch({
        type:'[auth] - login',
        payload:data as User
      })
    }else{
      logout()
    }
    setIsLoading(false)
  }

  const setIsError=(error:string)=>{
    dispatch({
      type:'[auth] - setIsError',
      payload:error
    })
  }

  const login =async(email:string,password:string):Promise<boolean>=>{
    setIsLoading(true)
    const {ok,data}= await loginRequest(email,password)
    if(ok){
      dispatch({
        type:'[auth] - login',
        payload:data as User
      })
    }else{
      setIsError(data as string)
    }
    setIsLoading(false)
    return ok
  }
  const register =async(user:User):Promise<boolean>=>{
    setIsLoading(true)
    const {ok,data}= await registerRequest(user)
    if(ok){
      dispatch({
        type:'[auth] - login',
        payload:data as User
      })
    }else{
      setIsError(data as string)
    }
    setIsLoading(false)
    return ok
  }

  const logout = ()=>{
    Cookies.remove('jwt')
    dispatch({
      type:'[auth] - logout',
      payload:Auth_INITIAL_STATE
    })
  }

  const setIsLoading = (payload:boolean)=>{
    dispatch({
      type:'[auth] - isLoading',
      payload
    })
  }

  const setShowForm = (payload:boolean)=>{
    dispatch({
      type:'[auth] - setShowForm',
      payload
    })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      register,
      setShowForm
    }}>
      {children}
    </AuthContext.Provider>
  )
}