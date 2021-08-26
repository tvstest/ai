import {
  IAsteroidForm,
  IRandomAsteroidData,
} from "../../utility/interfaces/asteroid";

export enum ActionType {
  LoadingRandomAsteroidId,
  LoadingAsteroidData,
  SetError,
  SetAsteroidId,
  SetAsteroidData,
}

export interface ILoadRandomAsteroidIdAction {
  type: ActionType.LoadingRandomAsteroidId;
}

export interface ILoadAsteroidDataAction {
  type: ActionType.LoadingAsteroidData;
}

export interface ISetAsteroidIdAction {
  type: ActionType.SetAsteroidId;
  payload: IAsteroidForm;
}

export interface ISetAsteroidDataAction {
  type: ActionType.SetAsteroidData;
  payload: IRandomAsteroidData;
}

export interface ISetErrorAction {
  type: ActionType.SetError;
  payload: { message: string };
}

export type AsteroidContextActions =
  | ILoadRandomAsteroidIdAction
  | ILoadAsteroidDataAction
  | ISetAsteroidIdAction
  | ISetAsteroidDataAction
  | ISetErrorAction;
