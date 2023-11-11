import belisarioApi from "@/database/apis";
import { IProvider } from "@/interfaces";

interface ProvidersResponse {
  ok: boolean;
  data: IProvider[] | IProvider | string;
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

export const postProvidersRequest = async (
  url: string,
  body:IProvider
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