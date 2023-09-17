import React, {useCallback, useEffect} from 'react';
import s from './Todolist.module.css';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button} from '@mui/material';
import {Clear} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store';
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC, ChangeTodolistTitleTC, DeleteTodolistTC,
  RemoveTodolistAC
} from './state/reducers/TodolistsReducer/TodolistsReducer';
import {
  AddTaskTC,
  GetTasksTC
} from './state/reducers/TasksReducers/TasksReducer';
import {ButtonWithMemo} from './components/ButtonWithMemo/ButtonWithMemo';
import {TaskWithRedux} from './components/Task/TaskWithRedux';
import {TaskType} from './api/todolists-api';

type PropsType = {
  tlId: string
}

export type TasksType = {
  [key: string]: Array<TaskType>
}

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
  addedDate: string
  order: number
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

export const Todolist1 = (props: PropsType) => {
  const todolists: TodolistsType = useSelector<AppRootStateType, TodolistsType>(state => state.todolists.find(tl => tl.id === props.tlId) as TodolistsType)
  const dispatch = useAppDispatch();
  const {id: tlId, title, filter} = todolists;
  
  useEffect(() => {
	dispatch(GetTasksTC(tlId))
  }, [])
  
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.tlId])
  
  console.log(tasks)
  
  const changeFilterHandler = useCallback((filter: FilterValueType) => {
	dispatch(ChangeTodolistFilterAC(tlId, filter))
  }, [tlId, filter])
  
  const addTask = useCallback((title: string) => {
	dispatch(AddTaskTC(tlId, title))
  }, [tlId, title])
  
  const changeTodolistTitleHandler = (newTitle: string) => {
	dispatch(ChangeTodolistTitleTC(tlId, newTitle))
  }
  
  const removeTodolistHandler = (tlId: string) => {
	dispatch(DeleteTodolistTC(tlId))
  }
  
  if (filter === 'Active') {
	tasks = tasks.filter(t => !t.status)
  }
  if (filter === 'Completed') {
	tasks = tasks.filter(t => t.status)
  }
  
  return (
	<div className={s.todolist}>
	  <h3 className={s.title}>
		<EditableSpan value={title}
					  onChange={changeTodolistTitleHandler}/>
		<Button
		  sx={{minWidth: 'fit-content'}}
		  color={'info'}
		  onClick={() => removeTodolistHandler(tlId)}><Clear/></Button>
	  </h3>
	  <div>
		<AddItemForm addItem={addTask}/>
	  </div>
	  <ul className={s.list}>
		{tasks?.map(el => {
		  return (
			<TaskWithRedux
			  key={el.id} task={el} tlId={tlId}
			/>
		  )
		})}
	  </ul>
	  <Grid item sx={{
		width: 'calc(100% - 2em)',
		display: 'flex',
		position: 'absolute',
		bottom: '0',
		margin: '1em 0',
	  }}>
		<ButtonWithMemo
		  title={'All'}
		  color={filter === 'All' ? 'secondary' : 'primary'}
		  variant={'outlined'} size={'small'}
		  onClick={() => changeFilterHandler('All')}
		/>
		<ButtonWithMemo
		  title={'Active'}
		  color={filter === 'Active' ? 'secondary' : 'primary'}
		  variant={'outlined'} size={'small'}
		  onClick={() => changeFilterHandler('Active')}
		/>
		<ButtonWithMemo
		  title={'Completed'}
		  color={filter === 'Completed' ? 'secondary' : 'primary'}
		  variant={'outlined'} size={'small'}
		  onClick={() => changeFilterHandler('Completed')}
		/>
	  </Grid>
	</div>
  )
}