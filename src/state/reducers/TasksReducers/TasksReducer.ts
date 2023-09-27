import {TasksType} from '../../../todolist/Todolist';
import {
  AddTodolistACType,
  RemoveTodolistACType,
  SetTodolistACType
} from '../TodolistsReducer/TodolistsReducer';
import {Dispatch} from 'redux';
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  TodolistsAPI,
  UpdateTaskModelType
} from '../../../api/todolists-api';
import {AppRootStateType} from '../../../app/store';
import {
  setAppErrorAC,
  SetAppErrorACType,
  setAppStatusAC,
  SetAppStatusACType
} from '../../../app/app-reducer';

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

const initialState: TasksType = {
}

export const TasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
	case 'GET-TASKS': {
	  return {...state, [action.payload.tlId]: action.payload.tasks}
	}
	case 'SET-TODOS': {
	  const copyState = {...state}
	  action.todos.forEach((td) => {
		copyState[td.id] = []
	  })
	  return copyState
	}
	case 'ADD-TASK': {
	  return {
		...state,
		[action.payload.tlId]: [action.payload.task, ...state[action.payload.tlId]]
	  }
	}
	case 'REMOVE-TASK': {
	  return {
		...state,
		[action.payload.tlId]: [...state[action.payload.tlId].filter(tl => tl.id !== action.payload.id)]
	  }
	}
	case 'ADD-TODOLIST': {
	  return {...state, [action.payload.tlId]: []}
	}
	case 'REMOVE-TODOLIST': {
	  let copy = {...state}
	  delete copy[action.payload.tlId]
	  return copy
	}
	case 'UPDATE-TASK': {
	  return {
		...state,
		[action.tlId]: state[action.tlId].map(t => t.id === action.id ? {...t, ...action.model} : t)
	  }
	}
	
	default:
	  return state
  }
  
}

type ActionsType =
  AddTaskACType
  | RemoveTaskACType
  | AddTodolistACType
  | RemoveTodolistACType
  | SetTodolistACType
  | ReturnType<typeof GetTasksAC>
  | SetAppStatusACType
  | SetAppErrorACType
  | UpdateTaskACType

type AddTaskACType = ReturnType<typeof AddTaskAC>
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
type UpdateTaskACType = ReturnType<typeof UpdateTaskAC>

export const AddTaskAC = (task: TaskType, tlId: string) => {
  return {
	type: 'ADD-TASK',
	payload: {
	  tlId, task
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

export const GetTasksAC = (tasks: TaskType[], tlId: string) => {
  return {
	type: 'GET-TASKS',
	payload: {
	  tlId,
	  tasks
	}
  } as const
}

export const UpdateTaskAC = (tlId: string, id: string, model: UpdateDomainTaskModelType) => {
  return {type: 'UPDATE-TASK', tlId, id, model} as const
}

export const GetTasksTC = (tlId: string) => (dispatch: Dispatch) => {
  TodolistsAPI.getTasks(tlId)
	.then(res => {
	  dispatch(GetTasksAC(res.data.items, tlId))
	})
}

export const RemoveTaskTC = (tlId: string, taskId: string) => (dispatch: Dispatch) => {
  TodolistsAPI.deleteTask(tlId, taskId)
	.then(res => {
	  dispatch(RemoveTaskAC(tlId, taskId))
	})
}

export const AddTaskTC = (tlId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.createTask(tlId, title)
	.then(res => {
	  if (res.data.resultCode === 0) {
		dispatch(AddTaskAC(res.data.data.item, tlId))
		dispatch(setAppStatusAC('succeeded'))
	  } else {
		const error = res.data.messages[0]
		if (error) {
		  dispatch(setAppErrorAC(error))
		} else {
		  dispatch(setAppStatusAC('failed'))
		}
		dispatch(setAppStatusAC('failed'))
	  }
	})
	.catch(e => {
	  dispatch(setAppStatusAC('failed'))
	  dispatch(setAppErrorAC(e.message))
	})
}

export const UpdateTaskTC = (tlId: string, id: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const state = getState()
  const task = state.tasks[tlId].find(t => t.id === id)
  if (task) {
	const model: UpdateTaskModelType = {
	  title: task.title,
	  description: task.description,
	  status: task.status,
	  priority: task.priority,
	  startDate: task.startDate,
	  deadline: task.deadline,
	  ...domainModel
	}
	
	
	TodolistsAPI.updateTask(tlId, id, model)
	  .then(res => {
		if (res.data.resultCode === 0) {
		}
		dispatch(UpdateTaskAC(tlId, id, model))
		dispatch(setAppStatusAC('succeeded'))
	  })
  }
}
