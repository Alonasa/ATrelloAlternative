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
	  return {
		...state,
		[action.payload.tlId]: [...state[action.payload.tlId].filter(tl => tl.id !== action.payload.id)]
	  }
	}
	case 'CHANGE-TASK-STATUS': {
	  return {...state,
		[action.payload.tlId]: [...state[action.payload.tlId].map(t => t.id === action.payload.id ? {
		  ...t,
		  isDone: !t.isDone
		} : t)]
	  }
	}
	
	default:
	  return state
  }
  
}

type ActionsType = AddTaskACType | RemoveTaskACType | ChangeTaskStatusACType

type AddTaskACType = ReturnType<typeof AddTaskAC>
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>


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

export const ChangeTaskStatusAC = (tlId: string, id: string) => {
  return {
	type: 'CHANGE-TASK-STATUS',
	payload: {
	  tlId, id
	}
  } as const
}