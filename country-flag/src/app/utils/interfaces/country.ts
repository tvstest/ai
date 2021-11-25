export interface ICountry {
  name: string
  alpha2Code: string
  capital: string
  population: number
  latlng: number[]
  flag: string
}

export interface ICountryResponse {
  name: ICountryName
  capital: string[]
  population: number
  latlng: number[]
  flags: IFlag
}

interface ICountryName {
  common: string
}

interface IFlag {
  png: string
}
