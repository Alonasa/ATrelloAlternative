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
    default:
      return state
  }
  
}

type ActionsType = AddTaskACType

type AddTaskACType = ReturnType<typeof AddTaskAC>

export const AddTaskAC = (tlId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      tlId, title
    }
  } as const
}