import { ISurvey } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
SELECT 
id_survey,
RS.created_at,
RS.id_provider,
RS.status,
id_answer_1,
id_answer_2,
id_answer_3,
id_answer_4,
id_answer_5,
id_answer_6,
id_answer_7,
id_survey_entry,
(C1.points * 50 /10 + C2.points * 50 /10)*25/100
+(C3.points * 50 /10 + C4.points * 50 /10)*35/100
+(C5.points * 35 /10 + C6.points * 35 /10 + C7.points * 30 /10)*40/100 total,
CP.name provider
FROM REG.Surveys RS
inner join Cat.Answers C1
on C1.id_answer=RS.id_answer_1
inner join Cat.Answers C2
on C2.id_answer=RS.id_answer_2
inner join Cat.Answers C3
on C3.id_answer=RS.id_answer_3
inner join Cat.Answers C4
on C4.id_answer=RS.id_answer_4
inner join Cat.Answers C5
on C5.id_answer=RS.id_answer_5
inner join Cat.Answers C6
on C6.id_answer=RS.id_answer_6
inner join Cat.Answers C7
on C7.id_answer=RS.id_answer_7
inner join Cat.Providers CP
on CP.id_provider= RS.id_provider
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_survey_entry=searchParams.get('id_survey_entry')

  return await getRequestQuery(`${query} where RS.status='true' and id_survey_entry=${id_survey_entry}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_survey,created_at,id_answer_1,id_answer_2,id_answer_3,id_answer_4,id_answer_5,id_answer_6,id_answer_7,id_provider,status,id_survey_entry}= body as ISurvey;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_survey),0)+1  FROM REG.Surveys)
  if ${id_survey} > 0
  begin
    UPDATE REG.Surveys
    SET id_answer_1='${id_answer_1}',
        id_answer_2='${id_answer_2}',
        id_answer_3='${id_answer_3}',
        id_answer_4='${id_answer_4}',
        id_answer_5='${id_answer_5}',
        id_answer_6='${id_answer_6}',
        id_answer_7='${id_answer_7}',
        id_provider='${id_provider}',
        id_survey_entry='${id_survey_entry}',
        status='${status}'
    WHERE id_survey=${id_survey}
    ${query} WHERE RS.id_survey=${id_survey}
  end
  else
  begin
    INSERT REG.Surveys(
      id_survey,
      created_at,
      id_answer_1,
      id_answer_2,
      id_answer_3,
      id_answer_4,
      id_answer_5,
      id_answer_6,
      id_answer_7,
      id_provider,
      id_survey_entry,
      status
    )
    VALUES(
      @const,
      '${created_at}',
      '${id_answer_1}',
      '${id_answer_2}',
      '${id_answer_3}',
      '${id_answer_4}',
      '${id_answer_5}',
      '${id_answer_6}',
      '${id_answer_7}',
      '${id_provider}',
      '${id_survey_entry}',
      '${status}'
    )
    ${query} WHERE RS.id_survey=@const
  end
  `)
};