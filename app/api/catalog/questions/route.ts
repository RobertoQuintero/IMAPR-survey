import { getRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>await getRequest(`Cat.Questions`)