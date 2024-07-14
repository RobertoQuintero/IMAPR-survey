'use client'
import { IPaymentWay, IProvider } from '@/interfaces/provider'
import { IAnswer, IQuestion, ISurvey, ISurveyEntry } from '@/interfaces/survey';
import { createContext } from 'react'

interface ContextProps{
  providersLoading: boolean;
  providersError: string | undefined;
  provider:IProvider | undefined;
  providers:IProvider[];
  paymentWays:IPaymentWay[]
  answers:IAnswer[];
  questions:IQuestion[];
  surveyEntries:ISurveyEntry[];
  surveyEntry:ISurveyEntry | undefined;
  surveys:ISurvey[];
  actionString:string | undefined;

  setProvider: (payload: IProvider | undefined) => void;
  setProviders: (payload: IProvider[]) => void;
  postProvider: (payload: IProvider) => Promise<boolean>;
  postSurvey: (payload: ISurvey) => Promise<boolean>;
  setSurveyEntry: (payload: ISurveyEntry | undefined) => void;
  postSurveyEntry: (payload: ISurveyEntry) => Promise<boolean>;
  setActionString: (payload: string | undefined) => void;
  getSurveys: (payload: number) => Promise<boolean>;
  postSurveyEntryName: (payload: ISurveyEntry) => Promise<{ok: boolean;data: string | ISurveyEntry;}>
}

export const ProvidersContext = createContext({} as ContextProps)