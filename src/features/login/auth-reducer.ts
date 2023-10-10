import {
  SetAppErrorACType,
  setAppStatusAC,
  SetAppStatusACType
} from '../../app/app-reducer';
import {Dispatch} from 'redux';

const initialState = {
  isLoggedIn: false
}

type InitialStateType = typeof initialState

type ActionsType =
  ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusACType
  | SetAppErrorACType

export const authReducer = (state: InitialStateType, action: ActionsType): InitialStateType => {
  switch (action.type) {
	case 'login/SET-IS-LOGGED-IN':
	  return {...state, isLoggedIn: action.value}
	default:
	  return state
  }
}

export const setIsLoggedInAC = (value: boolean) => ({
  type: 'login/SET-IS-LOGGED-IN',
  value
} as const)

export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
}
