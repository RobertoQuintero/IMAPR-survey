export interface IProvider{
  id_provider: number;
  key_string: string;
  legal_name: string;
  tax_id:string;
  description: string;
  sales_agent:string;
  phone:string;
  name?:string;
  status:boolean;
  created_at?:Date;
  updated_at?:Date;
  id_payment_way?: number;
  payment_way_name?:string;
  rank:number;
  street?:string;
  neighborhood?:string
  exterior?:string
  city?:string
  state?:string
  zip?:string
  id_tax_system: number;
  email:string;
}

export interface IPaymentWay {
  id_payment_way: number;
  description:    string;
  status:         boolean;
}
