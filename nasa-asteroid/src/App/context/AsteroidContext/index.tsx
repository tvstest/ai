import { useReducer } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { IRandomAsteroidData } from 'app/utility/interfaces/asteroid'
import { ActionType, AsteroidContextActions } from './actions'

interface IState {
  errorMessage: string
  loadingRandomAsteroidId: boolean
  status: string
  asteroidId: string
  loadingAsteroidData: boolean
  details: IRandomAsteroidData | null
}

const defaultState: IState = {
  errorMessage: '',
  details: null,
  status: '',
  asteroidId: '',
  loadingAsteroidData: false,
  loadingRandomAsteroidId: false,
}

export interface IAsteroidContext {
  state: IState
  dispatch: React.Dispatch<AsteroidContextActions>
}

const initialContext: IAsteroidContext = {
  state: defaultState,
  dispatch: () => undefined,
}

export const AsteroidContext = createContext<IAsteroidContext>(initialContext)

const astroidContextReducer = (
  state: IState,
  action: AsteroidContextActions
): IState => {
  switch (action.type) {
    case ActionType.LoadingAsteroidData:
      return {
        loadingAsteroidData: true,
        status: `Loading asteroid data of id ${state.asteroidId} ...`,
        asteroidId: state.asteroidId,
        details: null,
        errorMessage: '',
        loadingRandomAsteroidId: false,
      }
    case ActionType.LoadingRandomAsteroidId:
      return {
        loadingRandomAsteroidId: true,
        status: 'Loading random asteroid id ...',
        asteroidId: '',
        details: null,
        errorMessage: '',
        loadingAsteroidData: false,
      }
    case ActionType.SetAsteroidId:
      return {
        loadingRandomAsteroidId: false,
        status: '',
        asteroidId: action.payload.asteroidId,
        details: null,
        errorMessage: '',
        loadingAsteroidData: false,
      }
    case ActionType.SetAsteroidData:
      return {
        loadingRandomAsteroidId: false,
        status: '',
        asteroidId: state.asteroidId,
        details: action.payload,
        errorMessage: '',
        loadingAsteroidData: false,
      }
    case ActionType.SetError:
      return {
        loadingRandomAsteroidId: false,
        status: '',
        asteroidId: state.asteroidId,
        details: null,
        errorMessage: action.payload.message,
        loadingAsteroidData: false,
      }
    default:
      return defaultState
  }
}

const AsteroidContextWrapper: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(astroidContextReducer, defaultState)
  return (
    <AsteroidContext.Provider value={{ state, dispatch }}>
      {children}
    </AsteroidContext.Provider>
  )
}

export const useAsteroidContext = () => {
  const context = useContext(AsteroidContext)
  if (!context) {
    throw new Error(
      'This component must be used within a <AsteroidContextWrapper> component.'
    )
  }
  return context
}

export default AsteroidContextWrapper
