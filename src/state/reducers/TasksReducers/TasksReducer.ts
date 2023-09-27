import {TasksType} from '../../../todolist/Todolist';
import {
  AddTodolistACType,
  RemoveTodolistACType,
  SetTodolistACType
} from '../TodolistsReducer/TodolistsReducer';
import {Dispatch} from 'redux';
import {
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

const initialState: TasksType = {
  // ['todolistID1']: [
  // {id: v1(), title: 'HTML&CSS', isDone: true},
  // {id: v1(), title: 'JS', isDone: true},
  // {id: v1(), title: 'ReactJS', isDone: false},
  // {id: v1(), title: 'Rest API', isDone: false},
  // {id: v1(), title: 'GraphQL', isDone: false},
  // ],
  // ['todolistID2']: [
  // {id: v1(), title: 'HTML&CSS2', isDone: true},
  // {id: v1(), title: 'JS2', isDone: true},
  // {id: v1(), title: 'ReactJS2', isDone: false},
  // {id: v1(), title: 'Rest API2', isDone: false},
  // {id: v1(), title: 'GraphQL2', isDone: false},
  // ]
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
	case 'CHANGE-TASK-STATUS': {
	  return {
		...state,
		[action.payload.tlId]: state[action.payload.tlId].map(t =>
		  t.id === action.payload.id ? {
			...t,
			status: action.payload.status
		  } : t)
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
	case 'REMOVE-TODOLIST': {
	  let copy = {...state}
	  delete copy[action.payload.tlId]
	  return copy
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
  | RemoveTodolistACType
  | SetTodolistACType
  | ReturnType<typeof GetTasksAC>
  | SetAppStatusACType
  | SetAppErrorACType

type AddTaskACType = ReturnType<typeof AddTaskAC>
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>

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

export const ChangeTaskStatusAC = (tlId: string, id: string, status: TaskStatuses) => {
  return {
	type: 'CHANGE-TASK-STATUS',
	payload: {
	  tlId, id, status
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

export const GetTasksAC = (tasks: TaskType[], tlId: string) => {
  return {
	type: 'GET-TASKS',
	payload: {
	  tlId,
	  tasks
	}
  } as const
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

export const UpdateTaskTC = (tlId: string, id: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const task = getState().tasks[tlId].find(t => t.id === id)
  
  if (task) {
	const model: UpdateTaskModelType = {
	  title: task.title,
	  description: task.description,
	  status: status,
	  priority: task.priority,
	  startDate: task.startDate,
	  deadline: task.deadline,
	  todoListId: task.todoListId
	}
	
	TodolistsAPI.updateTask(tlId, id, model)
	  .then(res => {
		dispatch(ChangeTaskStatusAC(tlId, id, model.status))
	  })
  }
}

export const ChangeTaskTitleTC = (tlId: string, id: string, newTitle: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const task = getState().tasks[tlId].find(t => t.id === id)
  
  if (task) {
	const model: UpdateTaskModelType = {
	  title: newTitle,
	  description: task.description,
	  status: task.status,
	  priority: task.priority,
	  startDate: task.startDate,
	  deadline: task.deadline,
	  todoListId: task.todoListId
	}
	
	TodolistsAPI.updateTask(tlId, id, model)
	  .then(res => {
		dispatch(ChangeTaskTitleAC(tlId, id, model.title))
	  })
  }
}