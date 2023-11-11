'use client'
import { User } from '@/interfaces';
import { createContext } from 'react'

interface ContextProps{
  authLoading:boolean;
  logged: boolean;
  user: User | undefined;
  error: string | undefined;
  showForm: boolean;

  login: (email:string,password: string) => Promise<boolean>;
  register: (user: User) => Promise<boolean>
  logout: () => void;
  setShowForm:(payload:boolean)=>void

}

export const AuthContext = createContext({} as ContextProps)