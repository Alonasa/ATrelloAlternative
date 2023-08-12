import {TasksType} from '../../../Todolist';
import {v1} from 'uuid';

export const TasksReducer = (state: TasksType, action: ActionsType) => {
  switch (action.type) {
    case 'ADD-TASK': {
      return {
        ...state,
        [action.payload.tlId]: [{
          id: v1(),
          title: action.payload.title,
          isDone: false
        }, ...state[action.payload.tlId]]
      }
    }
    case 'REMOVE-TASK': {
      return {...state, [action.payload.tlId]: [...state[action.payload.tlId].filter(tl=> tl.id !== action.payload.id)]}
    }
    default:
      return state
  }
  
}

type ActionsType = AddTaskACType | RemoveTaskACType

type AddTaskACType = ReturnType<typeof AddTaskAC>
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>

export const AddTaskAC = (tlId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      tlId, title
    }
  } as const
}

export const RemoveTaskAC = (tlId: string, id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      tlId, id
    }
  } as const
}