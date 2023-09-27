import React from 'react';
import {FilterValueType} from '../../../todolist/Todolist';
import {v1} from 'uuid';
import {
  TaskStatuses,
  TodolistsAPI,
  TodolistType
} from '../../../api/todolists-api';
import {Dispatch} from 'redux';
import {
  RequestStatusType,
  setAppErrorAC,
  setAppStatusAC,
  SetAppStatusACType
} from '../../../app/app-reducer';

const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
  entityStatus: RequestStatusType
}

export const TodolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistDomainType> => {
  switch (action.type) {
	case 'SET-TODOS': {
	  return action.todos.map((el) => ({
		...el,
		filter: 'All',
		entityStatus: 'idle'
	  }))
	}
	case 'ADD-TODOLIST': {
	  return [{
		id: action.payload.tlId,
		title: action.payload.title,
		filter: 'All',
		addedDate: '',
		order: 0,
		entityStatus: 'idle'
	  }, ...state]
	}
	case 'REMOVE-TODOLIST': {
	  return state.filter(tl => tl.id !== action.payload.tlId)
	}
	case 'CHANGE-TODOLIST-FILTER': {
	  return state.map(tl => tl.id === action.payload.tlId ? {
		...tl,
		filter: action.payload.filter
	  } : tl)
	}
	case 'CHANGE-TODOLIST-TITLE': {
	  return state.map(tl => tl.id === action.payload.tlId ? {
		...tl,
		title: action.payload.newTitle
	  } : tl)
	}
	case 'SET-ENTITY-STATUS': {
	  return state.map(el => el.id === action.tlId ? {
		...el,
		entityStatus: action.status
	  } : el)
	}
	default:
	  return state
  }
}

export type ActionTypes =
  AddTodolistACType
  | RemoveTodolistACType
  | ChangeTodolistFilterACType
  | ChangeTodolistTitleACType
  | SetTodolistACType
  | SetAppStatusACType
  | SetTodolistEntityStatusACType

export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export type SetTodolistACType = ReturnType<typeof SetTodolistsAC>
export type SetTodolistEntityStatusACType = ReturnType<typeof SetTodolistEntityStatusAC>

export const AddTodolistAC = (title: string) => {
  return {
	type: 'ADD-TODOLIST',
	payload: {
	  tlId: v1(), title
	}
  } as const
}

export const RemoveTodolistAC = (tlId: string) => {
  return {
	type: 'REMOVE-TODOLIST',
	payload: {
	  tlId
	}
  } as const
}

export const ChangeTodolistFilterAC = (tlId: string, filter: FilterValueType) => {
  return {
	type: 'CHANGE-TODOLIST-FILTER',
	payload: {
	  tlId, filter
	}
  } as const
}

export const ChangeTodolistTitleAC = (tlId: string, newTitle: string) => {
  return {
	type: 'CHANGE-TODOLIST-TITLE',
	payload: {
	  tlId, newTitle
	}
  } as const
}

export const SetTodolistsAC = (todos: TodolistType[]) => {
  return {
	type: 'SET-TODOS', todos
  } as const
}

export const SetTodolistEntityStatusAC = (tlId: string, status: RequestStatusType) => {
  return {type: 'SET-ENTITY-STATUS', tlId, status} as const
}

export const GetTodo = (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.getTodolists()
	.then(res => {
	  dispatch(SetTodolistsAC(res.data))
	  dispatch(setAppStatusAC('succeeded'))
	})
}

export const CreateTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.createTodolist(title)
	.then(() => {
	  dispatch(AddTodolistAC(title))
	  dispatch(setAppStatusAC('succeeded'))
	})
}

export const DeleteTodolistTC = (tlId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(SetTodolistEntityStatusAC(tlId, 'loading'))
  TodolistsAPI.deleteTodolist(tlId)
	.then(res => {
	  if (res.data.resultCode === TaskStatuses.New) {
		dispatch(RemoveTodolistAC(tlId))
		dispatch(setAppStatusAC('succeeded'))
	  } else {
		const err = res.data.messages[0]
		if (err) {
		  dispatch(setAppErrorAC(err))
		} else {
		  dispatch(setAppErrorAC('Some Error'))
		}
		dispatch(setAppStatusAC('failed'))
		dispatch(SetTodolistEntityStatusAC(tlId, 'failed'))
	  }
	  
	}).catch(() => {
	dispatch(setAppStatusAC('failed'))
	dispatch(SetTodolistEntityStatusAC(tlId, 'failed'))
  })
}

export const ChangeTodolistTitleTC = (tlId: string, newTitle: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.updateTodolist(tlId, newTitle)
	.then(() => {
	  dispatch(ChangeTodolistTitleAC(tlId, newTitle))
	  dispatch(setAppStatusAC('succeeded'))
	})
}