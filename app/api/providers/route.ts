import db from "@/database/connection";
import { IProvider } from "@/interfaces";

export const GET = async(req:Request) =>{

  try {
    const data= await db.query(`
      SELECT *,
      (SELECT description FROM Cat.Payment_ways TF WHERE TF.id_payment_way=TL.id_payment_way) payment_way_name
      FROM Cat.Providers TL
    `)

    return Response.json({
      ok:true,
      data
    })
  } catch (error) {
    console.log({error})
    return Response.json({
      ok:false,
      data:'Error en el servidor al intentar conectar con la base de datos'
    },{
      status:500
    })
  }
};

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { 
    id_provider,
    key_string,
    legal_name,
    tax_id,
    description,
    sales_agent,
    phone,
    name,
    status,
    created_at,
    updated_at,
    id_payment_way,
    rank,
    street,
    neighborhood,
    exterior,
    city,
    state,
    zip,
    id_tax_system,
    email,

  }= body as IProvider;

  try {

    const resp= await db.query(`
      declare @const int 
      set @const=(SELECT isNull(max(id_provider),0)+1  FROM Cat.Providers)
      if ${id_provider} > 0  
      begin
        UPDATE Cat.Providers
        SET key_string='${key_string}',
            legal_name='${legal_name}',
            tax_id='${tax_id}',
            description='${description}',
            sales_agent='${sales_agent}',
            phone='${phone}',
            name='${name}',
            status='${status}',
            updated_at='${updated_at}',
            id_payment_way='${id_payment_way}',
            rank='${rank}',
            street='${street}',
            neighborhood='${neighborhood}',
            exterior='${exterior}',
            city='${city}',
            state='${state}',
            zip='${zip}',
            id_tax_system='${id_tax_system}',
            email='${email}'
        WHERE id_provider=${id_provider}
        SELECT * FROM Cat.Providers WHERE id_provider='${id_provider}'
      end
      else
      begin
        INSERT Cat.Providers (
          id_provider,
          key_string,
          legal_name,
          tax_id,
          description,
          sales_agent,
          phone,
          name,
          status,
          created_at,
          updated_at,
          id_payment_way,
          rank,
          street,
          neighborhood,
          exterior,
          city,
          state,
          zip,
          id_tax_system,
          email
        )
        VALUES (
          @const,
          '${key_string}',
          '${legal_name}',
          '${tax_id}',
          '${description}',
          '${sales_agent}',
          '${phone}',
          '${name}',
          '${status}',
          '${created_at}',
          '${updated_at}',
          '${id_payment_way}',
          '${rank}',
          '${street}',
          '${neighborhood}',
          '${exterior}',
          '${city}',
          '${state}',
          '${zip}',
          '${id_tax_system}',
          '${email}'
        )
        SELECT * FROM Cat.Providers WHERE id_provider=@const
        end;
    `)

    return Response.json({
      ok:true,
      data:resp[0]
    })
  } catch (error) {
    console.log({error})
    return Response.json({
      ok:false,
      data:'Error en el servidor al intentar conectar con la base de datos'
    },{
      status:500
    })
  }
};