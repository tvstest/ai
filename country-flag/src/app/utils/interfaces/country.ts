export interface ICountry {
  name: ICountryName
  alpha2Code: string
  capital: string[]
  population: number
  latlng: number[]
  flags: IFlag
  altSpellings: string[]
}

export interface ICountryName {
  common: string
  official: string
  nativeName: any
}
export interface IFlag {
  png: string
  svg: string
}
