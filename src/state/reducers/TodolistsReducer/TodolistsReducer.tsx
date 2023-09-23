import React from 'react';
import {FilterValueType, TodolistsType} from '../../../todolist/Todolist1';
import {v1} from 'uuid';
import {TodolistsAPI, TodolistType} from '../../../api/todolists-api';
import {Dispatch} from 'redux';
import {setAppStatusAC, SetAppStatusACType} from '../../../app/app-reducer';

const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
}

export const TodolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistsType> => {
  switch (action.type) {
	case 'SET-TODOS': {
	  return action.todos.map((el) => ({...el, filter: 'All'}))
	}
	case 'ADD-TODOLIST': {
	  return [{
		id: action.payload.tlId,
		title: action.payload.title,
		filter: 'All',
		addedDate: '',
		order: 0
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

export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export type SetTodolistACType = ReturnType<typeof SetTodolistsAC>


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

export const GetTodo = (dispatch: Dispatch) => {
  TodolistsAPI.getTodolists()
	.then(res => {
	  dispatch(SetTodolistsAC(res.data))
	  dispatch(setAppStatusAC("succeeded"))
	})
}

export const CreateTodolistTC = (title: string) => (dispatch: Dispatch) => {
  TodolistsAPI.createTodolist(title)
	.then(() => {
	  dispatch(AddTodolistAC(title))
	})
}

export const DeleteTodolistTC = (tlId: string) => (dispatch: Dispatch) => {
  TodolistsAPI.deleteTodolist(tlId)
	.then(() => {
	  dispatch(RemoveTodolistAC(tlId))
	})
}

export const ChangeTodolistTitleTC = (tlId: string, newTitle: string) => (dispatch: Dispatch) => {
  TodolistsAPI.updateTodolist(tlId, newTitle)
	.then(() => {
	  dispatch(ChangeTodolistTitleAC(tlId, newTitle))
	})
}