export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType
}

type InitialStateType = typeof initialState

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
	case 'APP/SET-STATUS':
	  return {...state, status: action.status}
	default:
	  return state
  }
}

type ActionsType = any

export const setAppStatusAC = (status: RequestStatusType)=> {return {type: 'APP/SET-STATUS', status} as const}
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>