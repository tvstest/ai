import {
  IAsteroidForm,
  IRandomAsteroidData,
} from 'app/utility/interfaces/asteroid'

export enum ActionType {
  LoadingRandomAsteroidId,
  LoadingAsteroidData,
  SetError,
  SetAsteroidId,
  SetAsteroidData,
}

export interface ILoadRandomAsteroidIdAction {
  type: ActionType.LoadingRandomAsteroidId
}

export interface ILoadAsteroidDataAction {
  type: ActionType.LoadingAsteroidData
}

export interface ISetAsteroidIdAction {
  type: ActionType.SetAsteroidId
  payload: IAsteroidForm
}

export interface ISetAsteroidDataAction {
  type: ActionType.SetAsteroidData
  payload: IRandomAsteroidData
}

export interface ISetErrorAction {
  type: ActionType.SetError
  payload: { message: string }
}

// action creators
export const loadRandomAsteroidId = (): ILoadRandomAsteroidIdAction => ({
  type: ActionType.LoadingRandomAsteroidId,
})

export const loadRandomAsteroidData = (): ILoadAsteroidDataAction => ({
  type: ActionType.LoadingAsteroidData,
})

export const setAsteroidId = (asteroidId: string): ISetAsteroidIdAction => ({
  type: ActionType.SetAsteroidId,
  payload: { asteroidId },
})

export const setAsteroidData = (
  data: IRandomAsteroidData
): ISetAsteroidDataAction => ({
  type: ActionType.SetAsteroidData,
  payload: data,
})

export const setError = (message: string): ISetErrorAction => ({
  type: ActionType.SetError,
  payload: { message },
})

export type AsteroidContextActions =
  | ILoadRandomAsteroidIdAction
  | ILoadAsteroidDataAction
  | ISetAsteroidIdAction
  | ISetAsteroidDataAction
  | ISetErrorAction
