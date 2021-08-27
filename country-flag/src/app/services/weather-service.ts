import { AxiosResponse } from "axios";
import { weatherHttpClient } from "app/services/http.service";
import { ICapitalWeatherInfo } from "app/utils/interfaces/weather";

const getWeatherByCity = (
  cityName: string
): Promise<AxiosResponse<ICapitalWeatherInfo>> =>
  weatherHttpClient.get(
    `/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${cityName}`
  );

export const weatherService = {
  getWeatherByCity,
};

export default weatherService;
