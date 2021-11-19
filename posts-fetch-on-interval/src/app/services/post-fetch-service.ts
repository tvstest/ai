import { AxiosResponse } from 'axios'
import { BASE_URL } from 'app/configs'
import { IPostFetchData } from 'app/utility/interface/post-data'
import httpClient from './base-service'

export const GetPostsData = (
  page: number
): Promise<AxiosResponse<IPostFetchData>> =>
  httpClient.get(`${BASE_URL}?tags=story&page=${page}`)
