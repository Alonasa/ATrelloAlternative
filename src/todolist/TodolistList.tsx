import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist';
import {useAppDispatch, useAppSelector} from '../app/store';
import {
  CreateTodolistTC,
  GetTodo,
  TodolistDomainType
} from '../state/reducers/TodolistsReducer/TodolistsReducer';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {Navigate} from 'react-router-dom';

export const TodolistList = () => {
  const dispatch = useAppDispatch();
  let todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  
  const addTodolist = useCallback((title: string) => {
	let action = CreateTodolistTC(title);
	dispatch(action);
  }, [dispatch])
  
  useEffect(() => {
    if(!isLoggedIn) return
	dispatch(GetTodo)
  }, [])
  
  if (!isLoggedIn) {
	return <Navigate to={'/login'}/>
  }
  
  return (
	<>
	  <Grid item xs={12} sm={12} md={12}>
		<AddItemForm addItem={addTodolist}/>
	  </Grid>
	  {todolists.map(tl => {
		return (
		  <Grid key={tl.id} item xs={12} sm={6} md={4}>
			<Paper elevation={6}
				   sx={{height: '100%', position: 'relative'}}>
			  <Todolist
				tlId={tl.id} entityStatus={tl.entityStatus}
			  />
			</Paper>
		  </Grid>
		)
	  })}
	</>
  );
};