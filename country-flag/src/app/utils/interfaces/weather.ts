export interface ILocation {
  name: string
  country: string
}

export interface ICurrentWeather {
  // eslint-disable-next-line camelcase
  weather_icons: string[]
  temperature: number
  // eslint-disable-next-line camelcase
  wind_speed: number
  precip: number
}

export interface ICapitalWeatherInfo {
  location: ILocation
  current: ICurrentWeather
}
