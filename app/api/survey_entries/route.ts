import { ISurveyEntry } from "@/interfaces";
import { getRequest, postRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>await getRequest(`REG.Survey_entries`)


export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_survey_entry,created_at,description,status,updated_date}= body as ISurveyEntry;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_survey_entry),0)+1  FROM REG.Survey_entries)
  if ${id_survey_entry} > 0
  begin
    UPDATE REG.Survey_entries
    SET description='${description}',
        status='${status}',
        updated_date='${updated_date}'
    WHERE id_survey_entry=${id_survey_entry}
    SELECT * FROM REG.Survey_entries WHERE id_survey_entry=${id_survey_entry}
  end
  else
  begin
    INSERT REG.Survey_entries(
      id_survey_entry,
      created_at,
      description,
      status,
      updated_date
    )
    VALUES(
      @const,
      '${created_at}',
      '${description}',
      '${status}',
      '${updated_date}'
    )
    SELECT * FROM REG.Survey_entries WHERE id_survey_entry=@const
  end
  `)
};