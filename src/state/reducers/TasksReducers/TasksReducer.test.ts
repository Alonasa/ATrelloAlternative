import {v1} from 'uuid';
import {TasksType} from '../../../Todolist1';
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  TasksReducer
} from './TasksReducer';
import {
  AddTodolistAC,
  RemoveTodolistAC
} from '../TodolistsReducer/TodolistsReducer';

let todolistID1: string;
let todolistID2: string;
let startState: TasksType

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();
  
  startState = {
	[todolistID1]: [
	  {id: '1', title: 'HTML&CSS', status: 2},
	  {id: '2', title: 'JS', status: 2},
	  {id: '3', title: 'ReactJS', status: 0},
	  {id: '4', title: 'Rest API', status: 0},
	  {id: '5', title: 'GraphQL', status: 0},
	],
	[todolistID2]: [
	  {id: '1', title: 'HTML&CSS2', status: 0},
	  {id: '2', title: 'JS', status: 0},
	  {id: '3', title: 'ReactJS', status: 0},
	  {id: '4', title: 'Rest API', status: 0},
	  {id: '5', title: 'GraphQL', status: 0},
	],
  }
})

test('New task should be added to the correct todolist', () => {
	let title = 'New task title';
	
	let task = {
	  id: '7', title: title, status: 0,
	  addedDate: '2023-09-09T10:43:35.683',
	  deadline: 'null',
	  description: 'null',
	  order: -11,
	  priority: 1,
	  startDate: 'null',
	  todoListId: todolistID1
	}
	
	const endState = TasksReducer(startState, AddTaskAC(task,todolistID2))
	
	expect(startState[todolistID2].length).toBe(5);
	expect(endState[todolistID2].length).toBe(6);
	expect(endState[todolistID2][0].title).toBe(title);
  }
)

test('Task should be removed from correct todolist', () => {
  const endState = TasksReducer(startState, RemoveTaskAC(todolistID1, '1'))
  
  expect(endState).toEqual(
	{
	  [todolistID1]: [
		{id: '2', title: 'JS', isDone: true},
		{id: '3', title: 'ReactJS', isDone: false},
		{id: '4', title: 'Rest API', isDone: false},
		{id: '5', title: 'GraphQL', isDone: false},
	  ],
	  [todolistID2]: [
		{id: '1', title: 'HTML&CSS2', isDone: true},
		{id: '2', title: 'JS2', isDone: true},
		{id: '3', title: 'ReactJS2', isDone: false},
		{id: '4', title: 'Rest API2', isDone: false},
		{id: '5', title: 'GraphQL2', isDone: false},
	  ],
	})
})


test('Correct task should change it\'s status', () => {
  const endState = TasksReducer(startState, ChangeTaskStatusAC(todolistID2, '3'))
  
  expect(startState[todolistID2].length).toBe(5)
  expect(endState[todolistID2].length).toBe(5)
  expect(startState[todolistID2][2].status).toBe(false);
  expect(endState[todolistID2][2].status).toBe(true);
  expect(endState[todolistID1][2].status).toBe(false);
})


test('Correct task should change it\'s title', () => {
  const newTitle = 'I am new title';
  const endState = TasksReducer(startState, ChangeTaskTitleAC(todolistID2, '1', newTitle))
  
  expect(startState[todolistID2].length).toBe(5)
  expect(endState[todolistID2].length).toBe(5)
  expect(startState[todolistID2][0].title).toBe('HTML&CSS2');
  expect(endState[todolistID2][0].title).toBe(newTitle);
  expect(endState[todolistID1][0].title).not.toEqual(endState[todolistID2][0].title)
})

test('Array of tasks in New todolist can\'t be empty', () => {
  const endState = TasksReducer(startState, AddTodolistAC('New Title'))
  
  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== todolistID1 && k !== todolistID2);
  if (!newKey) {
	throw Error('New key should be added')
  }
  
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const endState = TasksReducer(startState, RemoveTodolistAC(todolistID2))
  
  
  const keys = Object.keys(endState)
  
  expect(keys.length).toBe(1)
  expect(endState[todolistID2]).not.toBeDefined()
})
