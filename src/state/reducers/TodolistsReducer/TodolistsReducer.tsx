import React from 'react';
import {FilterValueType, TodolistsType} from '../../../Todolist';
import {v1} from 'uuid';

const initialState:Array<TodolistsType> = []

export const TodolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionTypes): Array<TodolistsType> => {
  switch (action.type) {
    case 'ADD-TODOLIST': {
      return [{
        id: action.payload.tlId,
        title: action.payload.title,
        filter: 'All'
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

export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>

let newID = v1();

export const AddTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      tlId: newID, title
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