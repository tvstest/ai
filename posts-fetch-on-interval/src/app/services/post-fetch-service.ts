import { AxiosResponse } from "axios";
import { BASE_URL } from "app/configs";
import httpClient from "./base-service";

export const GetPostsData = (page: number): Promise<AxiosResponse> =>
  httpClient.get(`${BASE_URL}?tags=story&page=${page}`);
