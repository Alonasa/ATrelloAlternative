import {v1} from 'uuid';
import {TasksType} from '../../../Todolist';
import {AddTaskAC, RemoveTaskAC, TasksReducer} from './TasksReducer';

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