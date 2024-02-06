
export interface IAnswer {
  id_answer:   number;
  id_question: number;
  description: string;
  status:      boolean;
  points:      number;
}

export interface IQuestion {
  id_question:     number;
  description:     string;
  status:          boolean;
  id_subcriterion: number;
}

export interface ISurvey {
  id_survey:   number;
  id_provider: number;
  status:      boolean;
  created_at:  string | Date;
  id_answer_1: number;
  id_answer_2: number;
  id_answer_3: number;
  id_answer_4: number;
  id_answer_5: number;
  id_answer_6: number;
  id_answer_7: number;
}
