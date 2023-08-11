import {v1} from 'uuid';
import {TodolistsType} from '../../App';
import {AddTodolistAC, TodolistsReducer} from './TodolistsReducer';

test('New todolist should be added', () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  const startState:Array<TodolistsType> = [
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'},
  ]
  
  let newTlId = v1();
  
  const endState = TodolistsReducer(startState, AddTodolistAC(newTlId, 'New Title'))
  
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe('New Title');
  expect(endState[0].id).toBe(newTlId);
  
})
