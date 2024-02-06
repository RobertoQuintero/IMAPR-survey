import belisarioApi from "@/database/apis";
import { IAnswer, IProvider, IQuestion } from "@/interfaces";

interface ProvidersResponse {
  ok: boolean;
  data: 
        IProvider[] 
        | IProvider 
        | string
        | IQuestion[]
        | IAnswer[]
}

export const getProvidersRequest = async (
  url: string,
): Promise<ProvidersResponse> => {
  let response = {} as ProvidersResponse;
  await belisarioApi
    .get(url)
    .then(({ data }) => {
      response = { ok: true, data: data.data };
    })
    .catch((error) => {
      if (error.response) {
        response = { ok: false, data: error.response.data.data };
      }
    });
  return response;
};

export const postProvidersRequest = async <T>(
  url: string,
  body:T
): Promise<ProvidersResponse> => {
  let response = {} as ProvidersResponse;
  await belisarioApi
    .post(url,body)
    .then(({ data }) => {
      response = { ok: true, data: data.data };
    })
    .catch((error) => {
      if (error.response) {
        response = { ok: false, data: error.response.data.data };
      }
    });
  return response;
};