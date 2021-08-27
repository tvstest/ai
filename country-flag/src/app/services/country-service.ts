import { ICountry } from "app/utils/interfaces/country";
import { AxiosResponse } from "axios";
import { countryHttpClient } from "app/services/http.service";

const getAll = (): Promise<AxiosResponse<ICountry[]>> =>
  countryHttpClient.get(`/all`);

const getByName = (countryName: string): Promise<AxiosResponse<ICountry[]>> =>
  countryHttpClient.get(`/name/${countryName}`);

export const countryService = {
  getByName,
  getAll,
};
export default countryService;
