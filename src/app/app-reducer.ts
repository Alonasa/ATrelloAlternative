export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string
}

type InitialStateType = typeof initialState

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
	case 'APP/SET-STATUS':
	  return {...state, status: action.status}
	case 'APP/SET-ERROR':
	  return {...state, error: action.error}
	default:
	  return state
  }
}

type ActionsType = SetAppStatusACType | SetAppErrorACType

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>


export const setAppStatusAC = (status: RequestStatusType)=> {return {type: 'APP/SET-STATUS', status} as const}
export const setAppErrorAC = (error: string | null)=> {return {type: 'APP/SET-ERROR', error} as const}