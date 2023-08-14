import {v1} from 'uuid';
import {TasksType} from '../../../Todolist';
import {
  AddTaskAC,
  ChangeTaskStatusAC, ChangeTaskTitleAC,
  RemoveTaskAC,
  TasksReducer
} from './TasksReducer';
import {AddTodolistAC} from '../TodolistsReducer/TodolistsReducer';

let todolistID1: string;
let todolistID2: string;
let startState: TasksType

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();
  
  startState = {
	[todolistID1]: [
	  {id: '1', title: 'HTML&CSS', isDone: true},
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
  }
})

test('New task should be added to the correct todolist', () => {
	let title = 'New task title';
	
	const endState = TasksReducer(startState, AddTaskAC(todolistID2, title))
	
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


test('Correct task should change it\'s status', ()=> {
  const endState = TasksReducer(startState, ChangeTaskStatusAC(todolistID2, '3'))
  
  expect(startState[todolistID2].length).toBe(5)
  expect(endState[todolistID2].length).toBe(5)
  expect(startState[todolistID2][2].isDone).toBe(false);
  expect(endState[todolistID2][2].isDone).toBe(true);
  expect(endState[todolistID1][2].isDone).toBe(false);
})


test('Correct task should change it\'s title', ()=> {
  const newTitle = 'I am new title';
  const endState = TasksReducer(startState, ChangeTaskTitleAC(todolistID2, '1', newTitle))
  
  expect(startState[todolistID2].length).toBe(5)
  expect(endState[todolistID2].length).toBe(5)
  expect(startState[todolistID2][0].title).toBe('HTML&CSS2');
  expect(endState[todolistID2][0].title).toBe(newTitle);
  expect(endState[todolistID1][0].title).not.toEqual(endState[todolistID2][0].title)
})

test('Array of tasks in New todolist can\'t be empty',()=>{
  const endState = TasksReducer(startState, AddTodolistAC('New Title'))
  
  const keys = Object.keys(endState);
  const newKey = keys.find(k=> k !== todolistID1 && k !==todolistID2);
  if(!newKey){
    throw Error("New key should be added")
  }
  
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([])
})