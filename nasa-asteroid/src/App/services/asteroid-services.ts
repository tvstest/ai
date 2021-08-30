/* eslint-disable import/no-anonymous-default-export */
import { NASA_API_KEY_PREFIX } from 'app/constants'
import { AxiosResponse } from 'axios'
import {
  IRandomAsteroidData,
  IRandomAsteroidDatResponse,
} from '../utility/interfaces/asteroid'
import axiosInstance from './base-services'

const getAsteroidById = (
  id: string
): Promise<AxiosResponse<IRandomAsteroidData>> =>
  axiosInstance.get(`/${id}${NASA_API_KEY_PREFIX}`)

const getRandomAsteroidId = (): Promise<
  AxiosResponse<IRandomAsteroidDatResponse>
> => axiosInstance.get(`/browse${NASA_API_KEY_PREFIX}`)

export default { getAsteroidById, getRandomAsteroidId }
