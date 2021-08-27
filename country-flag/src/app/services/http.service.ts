import { COUNTRIES_API_BASE_URL, WEATHER_API_BASE_URL } from "app/utils/constants";
import axios from "axios";

const httpClient = axios;
export const countryHttpClient = httpClient.create({
  baseURL: COUNTRIES_API_BASE_URL,
});
export const weatherHttpClient = httpClient.create({
  baseURL: WEATHER_API_BASE_URL,
});
