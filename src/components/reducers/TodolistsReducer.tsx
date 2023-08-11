import React from 'react';
import {TodolistsType} from '../../App';


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
    default:
      return state
  }
}

export type ActionTypes = AddTodolistACType | RemoveTodolistACType

type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>


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