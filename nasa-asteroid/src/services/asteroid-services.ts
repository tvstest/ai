/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from "axios";
import { NASA_API_KEY_PREFIX } from "../constants";
import {
  IRandomAsteroidData,
  IRandomAsteroidDatResponse,
} from "../utility/interfaces/asteroid";
import axiosInstance from "./base-services";

const getAsteroidById = (
  id: string
): Promise<AxiosResponse<IRandomAsteroidData>> =>
  axiosInstance.get(`/${id}${NASA_API_KEY_PREFIX}`);

const getRandomAsteroidId = (): Promise<
  AxiosResponse<IRandomAsteroidDatResponse>
> => axiosInstance.get(`/browse${NASA_API_KEY_PREFIX}`);

export default { getAsteroidById, getRandomAsteroidId };
