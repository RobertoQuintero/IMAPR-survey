import db from "@/database/connection";

export const GET = async(
  req:Request,
  {params}:{params:{id:string}}
  ) =>{
 

  try {
    const resp= await db.query(`
      select * FROM Cat.Providers where id_provider=${params.id}
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