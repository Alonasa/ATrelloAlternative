import React from 'react';
import {TodolistsType} from '../../App';
import {FilterValueType} from '../../Todolist';


export const TodolistsReducer = (state: TodolistsType[], action: ActionTypes) => {
  switch (action.type) {
    case 'ADD-TODOLIST': {
      return [{
        id: action.payload.tlId,
        title: action.payload.title,
        filter: 'All'
      }, ...state]
    }
    case 'REMOVE-TODOLIST': {
      return state.filter(tl=> tl.id!== action.payload.tlId)
    }
    case 'CHANGE-TODOLIST-FILTER':{
      return state.map(tl=> tl.id === action.payload.tlId ? {...tl, filter: action.payload.filter}: tl)
    }
    default:
      return state
  }
}

export type ActionTypes = AddTodolistACType | RemoveTodolistACType | ChangeTodolistFilterACType

type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>

export const AddTodolistAC = (tlId: string, title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      tlId, title
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
      tlId,filter
    }
  }as const
}