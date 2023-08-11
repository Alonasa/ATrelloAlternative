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
    default:
      return state
  }
}

export type ActionTypes = AddTodolistACType

type AddTodolistACType = ReturnType<typeof AddTodolistAC>

export const AddTodolistAC = (tlId: string, title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      tlId, title
    }
  } as const
}
