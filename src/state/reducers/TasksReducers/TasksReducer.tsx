import {TasksType, taskType} from '../../../Todolist1';
import {v1} from 'uuid';
import {
  AddTodolistACType,
  RemoveTodolistACType, SetTodolistACType
} from '../TodolistsReducer/TodolistsReducer';
import {Dispatch} from 'redux';
import {TodolistsAPI} from '../../../api/todolists-api';

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

export const TasksReducer = (state: TasksType = initialState, action: ActionsType) => {
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

export const GetTasksAC = (tasks: taskType[], tlId: string) => {
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
	  .then(res=>{
		dispatch(GetTasksAC(res.data.items, tlId))
	  })
}


export const RemoveTaskTC = (tlId: string, taskId: string) => (dispatch: Dispatch)=> {
  TodolistsAPI.deleteTask(tlId, taskId)
	.then(res=> {
	  dispatch(RemoveTaskAC(tlId, taskId))
	})
}

export const AddTaskTC = (tlId: string, title: string)=> (dispatch: Dispatch)=> {
  TodolistsAPI.createTask(tlId, title)
	.then(res=> {
	  dispatch(AddTaskAC(tlId,title))
	})
}

export const ChangeTaskTitleTC = (tlId: string, id: string, newTitle: string) => (dispatch: Dispatch) => {
 TodolistsAPI.updateTask(tlId, id, newTitle)
   .then(res=> {
     dispatch(ChangeTaskTitleAC(tlId,id,newTitle))
   })
}