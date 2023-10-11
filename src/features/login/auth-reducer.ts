import {
  SetAppErrorACType,
  setAppStatusAC,
  SetAppStatusACType
} from '../../app/app-reducer';
import {Dispatch} from 'redux';
import {authAPI} from '../../api/todolists-api';
import {
  handleServerAppError,
  handleServerNetworkError
} from '../../utils/error-utils';
import {LoginDataType} from './Login';

const initialState = {
  isLoggedIn: false
}

type InitialStateType = typeof initialState

type ActionsType =
  ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusACType
  | SetAppErrorACType

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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

export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  try{
    const result = await authAPI.login(data)
	if(result.data.resultCode === 0){
	  dispatch(setIsLoggedInAC(true))
	  dispatch(setAppStatusAC('succeeded'))
	}else{
	  handleServerAppError(dispatch, result.data)
	}
  }catch (e) {
	handleServerNetworkError(dispatch, e as string)
  }
}


export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  try{
	const result = await authAPI.me()
	if(result.data.resultCode === 0){
	  dispatch(setIsLoggedInAC(true))
	  dispatch(setAppStatusAC('succeeded'))
	}else{
	  handleServerAppError(dispatch, result.data)
	}
  }	catch (e) {
	handleServerNetworkError(dispatch, e as string)
  }
}
