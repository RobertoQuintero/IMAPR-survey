import { IPaymentWay, IProvider } from '@/interfaces/provider'
import { createContext } from 'react'

interface ContextProps{
  providersLoading: boolean;
  providersError: string | undefined;
  provider:IProvider | undefined;
  providers:IProvider[];
  paymentWays:IPaymentWay[]

  setProvider: (payload: IProvider | undefined) => Promise<void>;
  setProviders: (payload: IProvider[]) => Promise<void>;
  postProvider: (provider: IProvider) => Promise<boolean>
}

export const ProvidersContext = createContext({} as ContextProps)