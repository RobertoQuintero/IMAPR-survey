import { IPaymentWay, IProvider } from '@/interfaces/provider'
import { IAnswer, IQuestion, ISurvey } from '@/interfaces/survey';
import { createContext } from 'react'

interface ContextProps{
  providersLoading: boolean;
  providersError: string | undefined;
  provider:IProvider | undefined;
  providers:IProvider[];
  paymentWays:IPaymentWay[]
  answers:IAnswer[];
  questions:IQuestion[];

  setProvider: (payload: IProvider | undefined) => void;
  setProviders: (payload: IProvider[]) => void;
  postProvider: (payload: IProvider) => Promise<boolean>;
  postSurvey: (payload: ISurvey) => Promise<boolean>;
}

export const ProvidersContext = createContext({} as ContextProps)