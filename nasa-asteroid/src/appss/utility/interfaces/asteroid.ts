export interface IAsteroidForm {
  asteroidId: string
}

export interface IRandomAsteroidData {
  id: string
  name: string
  nasa_jpl_url: string
  is_potentially_hazardous_asteroid: boolean
}

export interface IRandomAsteroidDatResponse {
  near_earth_objects: Array<IRandomAsteroidData>
}
