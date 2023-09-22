import {
  AddTodolistAC,
  TodolistDomainType,
  TodolistsReducer
} from '../TodolistsReducer/TodolistsReducer';
import {TasksReducer} from '../TasksReducers/TasksReducer';
import {TasksType} from '../../../todolist/Todolist1';

test('ids should be equals', () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: Array<TodolistDomainType> = []
  
  const action = AddTodolistAC('New Title')
  
  const endTasksState = TasksReducer(startTasksState, action)
  const endTodolistsState = TodolistsReducer(startTodolistsState, action)
  
  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id
  
  expect(idFromTasks).toBe(action.payload.tlId)
  expect(idFromTodolists).toBe(action.payload.tlId)
})
