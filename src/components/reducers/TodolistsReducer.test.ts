import {v1} from 'uuid';
import {TodolistsType} from '../../App';
import {
  AddTodolistAC,
  RemoveTodolistAC,
  TodolistsReducer
} from './TodolistsReducer';


let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistsType>


beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();
  
  startState = [
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'},
  ]
})


test('New todolist should be added', () => {
  let newTlId = v1();
  const endState = TodolistsReducer(startState, AddTodolistAC(newTlId, 'New Title'))
  
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe('New Title');
  expect(endState[0].id).toBe(newTlId);
  
})

test('Selected Todolist should be removed', () => {
  const endState = TodolistsReducer(startState, RemoveTodolistAC(todolistID1))
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
  expect(endState[0].title).toBe('What to buy');
})
