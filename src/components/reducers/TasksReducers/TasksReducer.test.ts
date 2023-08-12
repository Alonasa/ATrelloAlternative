import {v1} from 'uuid';
import {TasksType} from '../../../Todolist';
import {AddTaskAC, TasksReducer} from './TasksReducer';

let todolistID1: string;
let todolistID2: string;
let startState: TasksType

beforeEach(()=> {
  todolistID1 = v1();
  todolistID2 = v1();
  
  startState = {
	[todolistID1]: [
	{id: v1(), title: 'HTML&CSS', isDone: true},
	{id: v1(), title: 'JS', isDone: true},
	{id: v1(), title: 'ReactJS', isDone: false},
	{id: v1(), title: 'Rest API', isDone: false},
	{id: v1(), title: 'GraphQL', isDone: false},
  ],
	[todolistID2]: [
	{id: v1(), title: 'HTML&CSS2', isDone: true},
	{id: v1(), title: 'JS2', isDone: true},
	{id: v1(), title: 'ReactJS2', isDone: false},
	{id: v1(), title: 'Rest API2', isDone: false},
	{id: v1(), title: 'GraphQL2', isDone: false},
  ]
  }
})

test("New task should be added to the correct todolist", ()=> {
  let title = 'New task title';
  
  const endState = TasksReducer(startState, AddTaskAC(todolistID2,title))
  
  expect(startState[todolistID2].length).toBe(5);
  expect(endState[todolistID2].length).toBe(6);
  expect(endState[todolistID2][0].title).toBe(title);
  }
)