import {TasksType} from '../../../Todolist';
import {v1} from 'uuid';
import {
  AddTodolistACType
} from '../TodolistsReducer/TodolistsReducer';

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
	  return {
		...state,
		[action.payload.tlId]: [...state[action.payload.tlId].map(t => t.id === action.payload.id ? {
		  ...t,
		  isDone: !t.isDone
		} : t)]
	  }
	}
	case 'CHANGE-TASK-TITLE': {
	  return {
		...state,
		[action.payload.tlId]: state[action.payload.tlId].map(t =>
          t.id === action.payload.id ? {
		  ...t,
		  title: action.payload.newTitle
		} : t)
	  }
	}
	case 'ADD-TODOLIST': {
	  return {...state, [action.payload.tlId]: []}
	}
 
	default:
	  return state
  }
  
}

type ActionsType =
  AddTaskACType
  | RemoveTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | AddTodolistACType

type AddTaskACType = ReturnType<typeof AddTaskAC>
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>

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

export const ChangeTaskTitleAC = (tlId: string, id: string, newTitle: string) => {
  return {
	type: 'CHANGE-TASK-TITLE',
	payload: {
	  tlId, id, newTitle
	}
  } as const
}