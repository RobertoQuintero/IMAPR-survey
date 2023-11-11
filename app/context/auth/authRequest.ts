import belisarioApi from "@/database/apis";
import { User } from "@/interfaces";
import Cookies from "js-cookie";

interface AuthResponse {
  ok: boolean;
  data: User | string;
}

export const loginRequest = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  let response = {} as AuthResponse;
  await belisarioApi
    .post("/auth/login", { email, password })
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

export const registerRequest = async (user: User): Promise<AuthResponse> => {
  let response = {} as AuthResponse;

  await belisarioApi
    .post("/auth/register", user)
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

export const validateTokenRequest = async (): Promise<AuthResponse> => {
  let response = {} as AuthResponse;
  await belisarioApi
    .get(`/auth/token`)
    .then(({ data }) => {
      response = { ok: true, data: data.data };
    })
    .catch((error) => {
      if (error.response) {
        Cookies.remove("jwt");
        response = {
          ok: false,
          data: error.response.data.data,
        };
      }
    });
  return response;
};
